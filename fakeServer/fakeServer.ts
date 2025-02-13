/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Endpoints } from '@fakeShared';
import { localStorageApi, logger } from '@utils';
import {
    delay,
    DefaultBodyType,
    http,
    HttpResponse,
    HttpResponseResolver,
    StrictRequest,
    StrictResponse,
    HttpHandler,
} from 'msw';
import { setupWorker } from 'msw/browser';
import { db } from './FakeDB';
import { Dummies } from './Dummies';
import { HTTP_METHODS, HTTP_STATUS_CODES, invariant, merge } from '@lesnoypudge/utils';
import { env } from '@vars';
import { token } from './token';
import { v4 as uuid } from 'uuid';
import { getAppData } from './utils';
import { T } from '@lesnoypudge/types-utils-base/namespace';
import E_Channel = Endpoints.V1.Channel;
import E_Conversation = Endpoints.V1.Conversation;
import E_File = Endpoints.V1.File;
import E_Message = Endpoints.V1.Message;
import E_Role = Endpoints.V1.Role;
import E_Server = Endpoints.V1.Server;
import E_TextChat = Endpoints.V1.TextChat;
import E_User = Endpoints.V1.User;
import { scenarios } from './Scenarios';



const res = HttpResponse;

const apiError = {
    badRequest: () => new res(null, {
        status: HTTP_STATUS_CODES.BAD_REQUEST,
    }) as never,
    unauthorized: () => new res(null, {
        status: HTTP_STATUS_CODES.UNAUTHORIZED,
    }) as never,
};

type EndpointObject = {
    Method: T.ValueOf<typeof HTTP_METHODS>;
    Path: string;
};

type Auth = {
    id: string;
};

type Handler<
    _Request extends DefaultBodyType,
    _Response extends DefaultBodyType,
> = (props: {
    body: _Request;
    auth: Auth;
    request: StrictRequest<_Request>;
}) => Promise<StrictResponse<_Response>> | 'unhandled';

const route = <
    _Request extends DefaultBodyType,
    _Response extends DefaultBodyType,
>(endpointObject: EndpointObject) => {
    return (...handlers: Handler<_Request, _Response>[]) => {
        const path = `${env._PUBLIC_SERVER_URL}${endpointObject.Path}`;

        const auth: Auth = { id: '' };

        return http[endpointObject.Method](
            path,
            async ({ request }) => {
                let result;

                await delay(1_500);

                const body = await request.json() as _Request;
                const req = request as StrictRequest<_Request>;

                for (const handler of handlers) {
                    result = await handler({ body, auth, request: req });
                }

                return result as any;
            },
        );
    };
};

const withAuth: Handler<any, any> = ({ auth, request }) => {
    const header = request.headers.get('Authorization');
    if (!header) {
        return apiError.unauthorized();
    }
    const headerToken = header.replace('Bearer ', '');
    const tokenData = token.validateAccessToken(headerToken);
    if (!tokenData) {
        return apiError.unauthorized();
    }

    auth.id = tokenData.id;

    return 'unhandled';
};

const routes: HttpHandler[] = [
    route<
        E_User.Login.RequestBody,
        E_User.Login.Response
    >(E_User.Login)(
        async ({ body }) => {
            const user = db.getOne('user', (item) => {
                return (
                    item.login === body.login
                    && item.password === body.password
                );
            });

            if (!user) return apiError.badRequest();

            user.status = 'online';

            if (localStorageApi.get('shouldPopulate')) {
                localStorageApi.set('shouldPopulate', false);
                scenarios.populate(user.id);
            }

            const populatedUser = db.getById('user', user.id);
            invariant(populatedUser);

            return res.json({
                userData: populatedUser,
                ...getAppData(populatedUser.id),
            });
        },
    ),

    route<
        E_User.Registration.RequestBody,
        E_User.Registration.Response
    >(E_User.Registration)(
        async ({ body, auth }) => {
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

            const dummy = Dummies.user({
                ...body,
                id,
                accessToken,
                refreshToken,
            });

            dummy.status = 'online';

            const user = db.create('user', dummy);

            if (localStorageApi.get('shouldPopulate')) {
                localStorageApi.set('shouldPopulate', false);
                scenarios.populate(user.id);
            }

            const populatedUser = db.getById('user', user.id);
            invariant(populatedUser);

            return res.json({
                userData: populatedUser,
                ...getAppData(populatedUser.id),
            });
        },
    ),

    route<
        E_User.Refresh.RequestBody,
        E_User.Refresh.Response
    >(E_User.Refresh)(
        async ({ body, auth }) => {
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

            updatedUser.status = 'online';

            if (localStorageApi.get('shouldPopulate')) {
                localStorageApi.set('shouldPopulate', false);
                scenarios.populate(user.id);
            }

            const populatedUser = db.getById('user', user.id);
            invariant(populatedUser);

            return res.json({
                userData: populatedUser,
                ...getAppData(populatedUser.id),
            });
        },
    ),

    route<
        E_Server.GetByInvitationCode.RequestBody,
        E_Server.GetByInvitationCode.Response
    >(E_Server.GetByInvitationCode)(
        withAuth,
        async ({ body, auth }) => {
            const server = db.getOne('server', (item) => {
                return item.invitations.some((inv) => {
                    return inv.code === body.invitationCode;
                });
            });

            if (!server) return apiError.badRequest();

            return res.json(server);
        },
    ),

    route<
        E_Server.Create.RequestBody,
        E_Server.Create.Response
    >(E_Server.Create)(
        withAuth,
        async ({ body, auth }) => {
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
        },
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

    route<
        E_Channel.GetMany.RequestBody,
        E_Channel.GetMany.Response
    >(E_Channel.GetMany)(
        async ({ body, auth }) => {
            const channels = db.getByIds(
                'channel',
                body.channelIds,
            );

            return res.json(channels);
        },
    ),

    route<
        E_Conversation.GetMany.RequestBody,
        E_Conversation.GetMany.Response
    >(E_Conversation.GetMany)(
        async ({ body, auth }) => {
            const conversations = db.getByIds(
                'conversation',
                body.conversationIds,
            );

            return res.json(conversations);
        },
    ),

    route<
        E_Role.GetMany.RequestBody,
        E_Role.GetMany.Response
    >(E_Role.GetMany)(
        async ({ body, auth }) => {
            const roles = db.getByIds(
                'role',
                body.roleIds,
            );

            return res.json(roles);
        },
    ),

    route<
        E_Server.GetMany.RequestBody,
        E_Server.GetMany.Response
    >(E_Server.GetMany)(
        async ({ body, auth }) => {
            const servers = db.getByIds(
                'server',
                body.serverIds,
            );

            return res.json(servers);
        },
    ),

    route<
        E_TextChat.GetMany.RequestBody,
        E_TextChat.GetMany.Response
    >(E_TextChat.GetMany)(
        async ({ body, auth }) => {
            const textChats = db.getByIds(
                'textChat',
                body.textChatIds,
            );

            return res.json(textChats);
        },
    ),

    route<
        E_User.GetMany.RequestBody,
        E_User.GetMany.Response
    >(E_User.GetMany)(
        async ({ body, auth }) => {
            const users = db.getByIds(
                'user',
                body.userIds,
            );

            return res.json(users);
        },
    ),

    route<
        E_User.ProfileUpdate.RequestBody,
        E_User.ProfileUpdate.Response
    >(E_User.ProfileUpdate)(
        async ({ auth, body }) => {
            const user = db.update('user', auth.id, (userToUpdate) => {
                if (
                    Object.hasOwn(body, 'avatar')
                    && userToUpdate.avatar
                ) {
                    db.delete('file', userToUpdate.avatar);
                }

                if (body.avatar === null) {
                    userToUpdate.avatar = body.avatar;
                }

                if (body.avatar) {
                    const avatar = db.create(
                        'file',
                        Dummies.file(body.avatar),
                    );

                    userToUpdate.avatar = avatar.id;
                }

                if (body.extraStatus) {
                    userToUpdate.extraStatus = body.extraStatus;
                }

                if (body.name) {
                    userToUpdate.name = body.name;
                }

                if (body.settings) {
                    userToUpdate.settings = body.settings;
                }

                return userToUpdate;
            });

            return res.json(user);
        },
    ),
];

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

    getRoutes = () => routes;
};

export const fakeServer = new FakeServer();