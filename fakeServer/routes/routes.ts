import { delay, http, HttpHandler } from 'msw';
import { Endpoints, extractBase64Data } from '@/fakeShared';
import {
    jsonResponse,
    route,
    setupScenarioIfNeeded,
    withAuth,
    apiError,
    _res,
} from './utils';
import { db } from '../FakeDB';
import {
    flattenPopulated,
    getAppData,
    getDeepConversation,
    getDeepServer,
} from '../utils';
import { v4 as uuid } from 'uuid';
import { Dummies, token } from '@/fakeServer';
import { env } from '@/vars';



import Channel = Endpoints.V1.Channel;
import Conversation = Endpoints.V1.Conversation;
import File = Endpoints.V1.File;
import Message = Endpoints.V1.Message;
import Role = Endpoints.V1.Role;
import Server = Endpoints.V1.Server;
import TextChat = Endpoints.V1.TextChat;
import User = Endpoints.V1.User;



export const getRoutes = (): HttpHandler[] => [
    route<
        User.Login.RequestBody,
        User.Login.Response
    >(User.Login)(
        async ({ body }) => {
            const user = db.getOne('user', (item) => {
                return (
                    item.login === body.login
                    && item.password === body.password
                );
            });
            if (!user) return apiError.badRequest();

            const populatedUser = await setupScenarioIfNeeded(user.id);

            populatedUser.status = 'online';

            return jsonResponse({
                userData: populatedUser,
                ...await getAppData(populatedUser.id),
            });
        },
    ),

    route<
        User.Registration.RequestBody,
        User.Registration.Response
    >(User.Registration)(
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

            const user = await db.create('user', dummy);

            const populatedUser = await setupScenarioIfNeeded(user.id);

            return jsonResponse({
                userData: populatedUser,
                ...await getAppData(populatedUser.id),
            });
        },
    ),

    route<
        User.Refresh.RequestBody,
        User.Refresh.Response
    >(User.Refresh)(
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

            const updatedUser = await db.update('user', user.id, (item) => ({
                ...item,
                accessToken,
            }));
            if (!updatedUser) return apiError.badRequest();

            const populatedUser = await setupScenarioIfNeeded(user.id);

            return jsonResponse({
                userData: populatedUser,
                ...await getAppData(populatedUser.id),
            });
        },
    ),

    route<
        Server.GetByInvitationCode.RequestBody,
        Server.GetByInvitationCode.Response
    >(Server.GetByInvitationCode)(
        withAuth,
        async ({ body, auth }) => {
            const server = db.getOne('server', (item) => {
                return item.invitations.some((inv) => {
                    return inv.code === body.invitationCode;
                });
            });

            if (!server) return apiError.badRequest();

            return jsonResponse(server);
        },
    ),

    route<
        Server.Create.RequestBody,
        Server.Create.Response
    >(Server.Create)(
        withAuth,
        async ({ body, auth }) => {
            const server = db.getOne('server', (item) => {
                return item.identifier === body.identifier;
            });

            if (server) return apiError.badRequest();

            const avatar = (
                body.avatar
                    ? await db.create('file', Dummies.file(body.avatar))
                    : null
            );

            const serverId = uuid();

            await db.update('user', auth.id, (user) => ({
                ...user,
                servers: [...new Set([
                    ...user.servers,
                    serverId,
                ])],
            }));

            const defaultRole = await db.create('role', Dummies.role({
                isDefault: true,
                users: [auth.id],
                avatar: null,
                color: null,
                id: uuid(),
                name: 'default',
                server: serverId,
            }));

            const adminRole = await db.create('role', Dummies.role({
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

            const textChat = await db.create('textChat', Dummies.textChatChannel({
                id: uuid(),
                channel: textChannelId,
                server: serverId,
                messages: [],
            }));

            const textChannel = await db.create('channel', Dummies.channel({
                id: textChannelId,
                name: 'Text channel',
                roleWhitelist: [],
                server: serverId,
                textChat: textChat.id,
            }));

            const newServer = await db.create('server', Dummies.server({
                id: serverId,
                avatar: avatar?.id ?? null,
                identifier: body.identifier,
                name: body.name,
                owner: auth.id,
                channels: [textChannel.id],
                members: [auth.id],
                roles: [defaultRole.id, adminRole.id],
            }));

            return jsonResponse(newServer);
        },
    ),

    http[File.Read.Method](
        `${env._PUBLIC_SERVER_URL}${File.Read.Path}/:fileId`,
        async ({ params }) => {
            await delay();

            const { fileId } = params as { fileId: string };
            if (!fileId) return apiError.badRequest();

            const file = db.getById('file', fileId);
            if (!file) return apiError.badRequest();

            const base64Data = extractBase64Data(file);
            if (!base64Data) return apiError.badRequest();

            const buffer = Uint8Array.from(
                atob(base64Data),
                // eslint-disable-next-line unicorn/prefer-code-point
                (char) => char.charCodeAt(0),
            );

            return _res.arrayBuffer(buffer, {
                headers: {
                    'Content-Type': file.type,
                    'Content-Length': buffer.byteLength.toString(),
                },
            });
        },
    ),

    route<
        Channel.GetMany.RequestBody,
        Channel.GetMany.Response
    >(Channel.GetMany)(
        withAuth,
        async ({ body, auth }) => {
            const channels = db.getByIds(
                'channel',
                body.channelIds,
            );

            return jsonResponse(channels);
        },
    ),

    route<
        Conversation.GetMany.RequestBody,
        Conversation.GetMany.Response
    >(Conversation.GetMany)(
        withAuth,
        async ({ body, auth }) => {
            const conversations = db.getByIds(
                'conversation',
                body.conversationIds,
            );

            return jsonResponse(conversations);
        },
    ),

    route<
        Role.GetMany.RequestBody,
        Role.GetMany.Response
    >(Role.GetMany)(
        withAuth,
        async ({ body, auth }) => {
            const roles = db.getByIds(
                'role',
                body.roleIds,
            );

            return jsonResponse(roles);
        },
    ),

    route<
        Server.GetMany.RequestBody,
        Server.GetMany.Response
    >(Server.GetMany)(
        withAuth,
        async ({ body, auth }) => {
            const servers = db.getByIds(
                'server',
                body.serverIds,
            );

            return jsonResponse(servers);
        },
    ),

    route<
        TextChat.GetMany.RequestBody,
        TextChat.GetMany.Response
    >(TextChat.GetMany)(
        withAuth,
        async ({ body, auth }) => {
            const textChats = db.getByIds(
                'textChat',
                body.textChatIds,
            );

            return jsonResponse(textChats);
        },
    ),

    route<
        User.GetMany.RequestBody,
        User.GetMany.Response
    >(User.GetMany)(
        withAuth,
        async ({ body, auth }) => {
            const users = db.getByIds(
                'user',
                body.userIds,
            );

            return jsonResponse(users);
        },
    ),

    route<
        User.ProfileUpdate.RequestBody,
        User.ProfileUpdate.Response
    >(User.ProfileUpdate)(
        withAuth,
        async ({ auth, body }) => {
            const user = await db.update('user', auth.id, async (userToUpdate) => {
                if (
                    Object.hasOwn(body, 'avatar')
                    && userToUpdate.avatar
                ) {
                    await db.delete('file', userToUpdate.avatar);
                }

                if (body.avatar === null) {
                    userToUpdate.avatar = body.avatar;
                }

                if (body.avatar) {
                    const avatar = await db.create(
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
                    Object.assign(userToUpdate.settings, body.settings);
                }

                return userToUpdate;
            });

            if (!user) return apiError.badRequest();

            return jsonResponse(user);
        },
    ),

    route<
        Server.GetManyDeep.RequestBody,
        Server.GetManyDeep.Response
    >(Server.GetManyDeep)(
        withAuth,
        async ({ body, auth }) => {
            const {
                Channel = [],
                Role = [],
                Server = [],
                TextChat = [],
                User = [],
            } = await flattenPopulated('', body.serverIds.map((id) => {
                return getDeepServer({
                    userId: auth.id,
                    serverId: id,
                });
            }));

            return jsonResponse({
                Channel,
                Role,
                Server,
                TextChat,
                User,
            });
        },
    ),

    route<
        Conversation.GetManyDeep.RequestBody,
        Conversation.GetManyDeep.Response
    >(Conversation.GetManyDeep)(
        withAuth,
        async ({ body, auth }) => {
            const {
                Conversation = [],
                TextChat = [],
                User = [],
            } = await flattenPopulated('', body.conversationIds.map((id) => {
                return getDeepConversation({
                    userId: auth.id,
                    conversationId: id,
                });
            }));

            return jsonResponse({
                Conversation,
                TextChat,
                User,
            });
        },
    ),
    route<
        Message.GetManyByTextChatId.RequestBody,
        Message.GetManyByTextChatId.Response
    >(Message.GetManyByTextChatId)(
        withAuth,
        async ({ body, auth }) => {
            const textChat = db.getById('textChat', body.textChatId);

            if (!textChat) return apiError.badRequest();

            const sliceTo = body.from ?? textChat.messageCount;
            const sliceFrom = Math.max(0, sliceTo - body.limit);

            const messages = db.getByIds(
                'message',
                textChat.messages.slice(sliceFrom, sliceTo),
            );

            return jsonResponse(messages);
        },
    ),
];