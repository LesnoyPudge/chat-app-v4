/* eslint-disable @typescript-eslint/no-explicit-any */

import { Endpoints } from '@fakeShared';
import { logger } from '@utils';
import {
    delay as _delay,
    http,
    HttpResponse,
    HttpResponseResolver,
} from 'msw';
import { setupWorker } from 'msw/browser';
import { db } from './FakeDB';
import { Dummies } from './Dummies';
import { HTTP_STATUS_CODES } from '@lesnoypudge/utils';
import { env } from '@vars';
import { token } from './token';
import { v4 as uuid } from 'uuid';


import E_Channel = Endpoints.V1.Channel;
import E_Conversation = Endpoints.V1.Conversation;
import E_File = Endpoints.V1.File;
import E_Message = Endpoints.V1.Message;
import E_Role = Endpoints.V1.Role;
import E_Server = Endpoints.V1.Server;
import E_TextChat = Endpoints.V1.TextChat;
import E_User = Endpoints.V1.User;
import { getAppData } from './utils';



const res = HttpResponse;

const delay = () => _delay(1_500);

export const withAuth = <
    _Resolver extends HttpResponseResolver<any, any, any>,
>(
    resolver: (
        info: Parameters<_Resolver>[0] & {
            auth: {
                id: string;
            };
        }
    ) => ReturnType<_Resolver>,
): _Resolver => {
    const fn: HttpResponseResolver<any, any, any> = (input) => {
        const { request } = input;

        const header = request.headers.get('Authorization');
        if (!header) {
            return apiError.unauthorized();
        }
        const headerToken = header.replace('Bearer ', '');
        const tokenData = token.validateAccessToken(headerToken);
        if (!tokenData) {
            return apiError.unauthorized();
        }

        return resolver({
            ...input,
            auth: {
                id: tokenData.id,
            },
        });
    };

    return fn as _Resolver;
};

const apiError = {
    badRequest: () => new res(null, {
        status: HTTP_STATUS_CODES.BAD_REQUEST,
    }) as never,
    unauthorized: () => new res(null, {
        status: HTTP_STATUS_CODES.UNAUTHORIZED,
    }) as never,
};

class FakeServer {
    async init() {
        const worker = setupWorker(...this.getRoutes());

        await worker.start({
            onUnhandledRequest: (request, print) => {
                if (!request.url.includes(env._PUBLIC_API_V1)) return;

                print.warning();
            },
        });

        logger.log('FakeServer initialized');
    }

    getRoutes = () => [
        http[E_User.Login.Method]<
            any,
            E_User.Login.RequestBody,
            E_User.Login.Response
        >(
            `${env._PUBLIC_SERVER_URL}${E_User.Login.Path}`,
            async ({ request }) => {
                await delay();
                const body = await request.json();

                const user = db.getOne('user', (item) => {
                    return (
                        item.login === body.login
                        && item.password === body.password
                    );
                });

                if (!user) return apiError.badRequest();

                return res.json({
                    userData: user,
                    ...getAppData(user.id),
                });
            },
        ),

        http[E_User.Registration.Method]<
            any,
            E_User.Registration.RequestBody,
            E_User.Registration.Response
        >(
            `${env._PUBLIC_SERVER_URL}${E_User.Registration.Path}`,
            async ({ request }) => {
                await delay();
                const body = await request.json();

                const isExist = db.getOne('user', (item) => {
                    return item.login === body.login;
                });

                if (isExist) return apiError.badRequest();

                const id = uuid();

                const {
                    accessToken,
                    refreshToken,
                } = token.generateTokens({
                    id,
                    password: body.password,
                });

                const user = db.create('user', Dummies.user({
                    ...body,
                    id,
                    accessToken,
                    refreshToken,
                }));

                user.status = 'online';

                return res.json({
                    userData: user,
                    ...getAppData(user.id),
                });
            },
        ),

        http[E_User.Refresh.Method]<
            any,
            E_User.Refresh.RequestBody,
            E_User.Refresh.Response
        >(
            `${env._PUBLIC_SERVER_URL}${E_User.Refresh.Path}`,
            async ({ request }) => {
                await delay();
                const body = await request.json();

                const user = db.getOne('user', (item) => {
                    return item.refreshToken === body.refreshToken;
                });

                if (!user) return apiError.badRequest();

                const {
                    accessToken,
                } = token.generateTokens({
                    id: user.id,
                    password: user.password,
                });

                const updatedUser = db.update('user', user.id, (item) => ({
                    ...item,
                    accessToken,
                }));
                if (!updatedUser) return apiError.badRequest();

                return res.json({
                    userData: updatedUser,
                    ...getAppData(updatedUser.id),
                });
            },
        ),

        http[E_Server.GetByInvitationCode.Method]<
            any,
            E_Server.GetByInvitationCode.RequestBody,
            E_Server.GetByInvitationCode.Response
        >(
            `${env._PUBLIC_SERVER_URL}${E_Server.GetByInvitationCode.Path}`,
            withAuth(async ({ request }) => {
                await delay();
                const body = await request.json();

                const server = db.getOne('server', (item) => {
                    return item.invitations.some((inv) => {
                        return inv.code === body.invitationCode;
                    });
                });

                if (!server) return apiError.badRequest();

                return res.json(server);
            }),
        ),

        http[E_Server.Create.Method]<
            any,
            E_Server.Create.RequestBody,
            E_Server.Create.Response
        >(
            `${env._PUBLIC_SERVER_URL}${E_Server.Create.Path}`,
            withAuth(async ({ request, auth }) => {
                await delay();
                const body = await request.json();

                const server = db.getOne('server', (item) => {
                    return item.identifier === body.identifier;
                });

                if (server) return apiError.badRequest();

                const avatar = (
                    body.avatar
                        ? db.create('file', Dummies.file(body.avatar))
                        : null
                );

                const serverId = uuid();

                db.update('user', auth.id, (user) => ({
                    ...user,
                    servers: [...new Set([
                        ...user.servers,
                        serverId,
                    ])],
                }));

                const defaultRole = db.create('role', Dummies.role({
                    isDefault: true,
                    users: [auth.id],
                    avatar: null,
                    color: null,
                    id: uuid(),
                    name: 'default',
                    server: serverId,
                }));

                const adminRole = db.create('role', Dummies.role({
                    isDefault: false,
                    users: [auth.id],
                    avatar: null,
                    color: null,
                    id: uuid(),
                    name: 'admin',
                    server: serverId,
                    permissions: {
                        admin: true,
                        banMember: true,
                        channelControl: true,
                        createInvitation: true,
                        kickMember: true,
                        serverControl: true,
                    },
                }));

                const textChannelId = uuid();

                const textChat = db.create('textChat', Dummies.textChatChannel({
                    id: uuid(),
                    channel: textChannelId,
                    server: serverId,
                }));

                const textChannel = db.create('channel', Dummies.channel({
                    id: textChannelId,
                    name: 'Text channel',
                    roleWhitelist: [],
                    server: serverId,
                    textChat: textChat.id,
                    voiceChat: null,
                }));

                const voiceChannelId = uuid();

                const voiceChat = db.create(
                    'voiceChat',
                    Dummies.voiceChatChannel({
                        id: uuid(),
                        channel: voiceChannelId,
                        server: serverId,
                    }),
                );

                const voiceChannel = db.create('channel', Dummies.channel({
                    id: voiceChannelId,
                    name: 'Text channel',
                    roleWhitelist: [],
                    server: serverId,
                    voiceChat: voiceChat.id,
                    textChat: null,
                }));

                const newServer = db.create('server', Dummies.server({
                    id: serverId,
                    avatar: avatar?.id ?? null,
                    identifier: body.identifier,
                    name: body.name,
                    owner: auth.id,
                    channels: [textChannel.id, voiceChannel.id],
                    members: [auth.id],
                    roles: [defaultRole.id, adminRole.id],
                }));

                return res.json(newServer);
            }),
        ),

        http[E_File.Read.Method](
            `${env._PUBLIC_SERVER_URL}${E_File.Read.Path}/:fileId`,
            async ({ params }) => {
                await delay();

                const { fileId } = params as { fileId: string };
                if (!fileId) return apiError.badRequest();

                const file = db.getById('file', fileId);
                if (!file) return apiError.badRequest();

                const base64Data = file.base64.split(';base64,')[1];
                if (!base64Data) return apiError.badRequest();

                const buffer = Uint8Array.from(
                    atob(base64Data),
                    // eslint-disable-next-line unicorn/prefer-code-point
                    (char) => char.charCodeAt(0),
                );

                return res.arrayBuffer(buffer, {
                    headers: {
                        'Content-Type': file.type,
                        'Content-Length': buffer.byteLength.toString(),
                    },
                });
            },
        ),
    ];
}

export const fakeServer = new FakeServer();