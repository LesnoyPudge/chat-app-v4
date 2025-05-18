/* eslint-disable @typescript-eslint/no-misused-spread */
import { delay, http } from 'msw';
import { Endpoints, extractBase64Data } from '@/fakeShared';
import {
    jsonResponse,
    route,
    setupScenarioIfNeeded,
    withAuth,
    _res,
    invariantBadRequest,
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
import { ClientEntities } from '@/types';



import User = Endpoints.V1.User;
import Server = Endpoints.V1.Server;
import Channel = Endpoints.V1.Channel;
import Conversation = Endpoints.V1.Conversation;
import TextChat = Endpoints.V1.TextChat;
import Message = Endpoints.V1.Message;
import File = Endpoints.V1.File;
import Role = Endpoints.V1.Role;



class UserRoutes {
    [User.AcceptFriendRequest.NamedAction] = route<
        User.AcceptFriendRequest.RequestBody,
        User.AcceptFriendRequest.Response
    >(User.AcceptFriendRequest)(
        withAuth,
        async ({ body, auth }) => {
            const updated = await db.update('user', auth.id, (_user) => ({
                ..._user,
                incomingFriendRequests: (
                    _user.incomingFriendRequests.filter((v) => {
                        return v.from === body.targetId;
                    })
                ),
                friends: [..._user.friends, body.targetId],
            }));
            invariantBadRequest(updated);

            await db.update('user', body.targetId, (_user) => ({
                ..._user,
                outgoingFriendRequests: (
                    _user.outgoingFriendRequests.filter((v) => {
                        return v.to === auth.id;
                    })
                ),
                friends: [..._user.friends, auth.id],
            }));

            return jsonResponse(updated);
        },
    );

    [User.CredentialsUpdate.NamedAction] = route<
        User.CredentialsUpdate.RequestBody,
        User.CredentialsUpdate.Response
    >(User.CredentialsUpdate)(
        withAuth,
        async ({ body, auth }) => {
            const updated = await db.update('user', auth.id, (_user) => ({
                ..._user,
                password: body.newPassword ?? _user.password,
            }));
            invariantBadRequest(updated);

            return jsonResponse(updated);
        },
    );

    [User.DeleteAccount.NamedAction] = route<
        User.DeleteAccount.RequestBody,
        User.DeleteAccount.Response
    >(User.DeleteAccount)(
        withAuth,
        async ({ body, auth }) => {
            const isDeleted = await db.delete('user', auth.id);
            invariantBadRequest(isDeleted);
            // omit recursive data deletion
        },
    );

    [User.DeleteFriend.NamedAction] = route<
        User.DeleteFriend.RequestBody,
        User.DeleteFriend.Response
    >(User.DeleteFriend)(
        withAuth,
        async ({ body, auth }) => {
            const updated = await db.update('user', auth.id, (_user) => ({
                ..._user,
                friends: _user.friends.filter((id) => id === body.targetId),
            }));
            invariantBadRequest(updated);

            await db.update('user', body.targetId, (_user) => ({
                ..._user,
                friends: _user.friends.filter((id) => id === auth.id),
            }));

            return jsonResponse(updated);
        },
    );

    [User.GetMany.NamedAction] = route<
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
    );

    [User.GetPossibleFriendsByName.NamedAction] = route<
        User.GetPossibleFriendsByName.RequestBody,
        User.GetPossibleFriendsByName.Response
    >(User.GetPossibleFriendsByName)(
        withAuth,
        async ({ body, auth }) => {
            const user = db.getById('user', auth.id);
            invariantBadRequest(user);

            const excludeList = new Set<string>([
                auth.id,
                ...user.friends,
                ...user.blocked,
                ...user.incomingFriendRequests.map((v) => v.from),
                ...user.outgoingFriendRequests.map((v) => v.to),
            ]);

            const possibleFriendIds = db.getMany('user', (v) => {
                return (
                    !excludeList.has(v.id)
                    && !v.blocked.includes(auth.id)
                    && v.name.includes(body.name)
                );
            });

            return jsonResponse(possibleFriendIds);
        },
    );

    [User.HideConversation.NamedAction] = route<
        User.HideConversation.RequestBody,
        User.HideConversation.Response
    >(User.HideConversation)(
        withAuth,
        async ({ body, auth }) => {
            const updated = await db.update('user', auth.id, (_user) => ({
                ..._user,
                hiddenConversations: [
                    ..._user.hiddenConversations,
                    body.conversationId,
                ],
            }));
            invariantBadRequest(updated);

            return jsonResponse(updated);
        },
    );

    [User.Login.NamedAction] = route<
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
            invariantBadRequest(user);

            const populatedUser = await setupScenarioIfNeeded(user.id);

            populatedUser.status = 'online';

            return jsonResponse({
                userData: populatedUser,
                ...await getAppData(populatedUser.id),
            });
        },
    );

    [User.Logout.NamedAction] = route<
        User.Logout.RequestBody,
        User.Logout.Response
    >(User.Logout)(
        withAuth,
        async ({ body, auth }) => {
            await db.update('user', auth.id, (_user) => ({
                ..._user,
                accessToken: token.generateTokens({
                    id: _user.id,
                    password: _user.password,
                }).accessToken,
            }));
        },
    );

    [User.MarkConversationNotificationsAsRead.NamedAction] = route<
        User.MarkConversationNotificationsAsRead.RequestBody,
        User.MarkConversationNotificationsAsRead.Response
    >(User.MarkConversationNotificationsAsRead)(
        withAuth,
        async ({ body, auth }) => {
            const textChat = db.getOne('textChat', (v) => {
                return v.conversation === body.conversationId;
            });
            invariantBadRequest(textChat);

            const updated = await db.update('user', auth.id, (_user) => ({
                ..._user,
                lastSeenMessages: {
                    ..._user.lastSeenMessages,
                    [textChat.id]: textChat.messageCount,
                },
            }));
            invariantBadRequest(updated);

            return jsonResponse(updated);
        },
    );

    [User.MarkServerNotificationsAsRead.NamedAction] = route<
        User.MarkServerNotificationsAsRead.RequestBody,
        User.MarkServerNotificationsAsRead.Response
    >(User.MarkServerNotificationsAsRead)(
        withAuth,
        async ({ body, auth }) => {
            const textChats = db.getMany('textChat', (v) => {
                return v.server === body.serverId;
            });

            const updated = await db.update('user', auth.id, (_user) => {
                textChats.forEach(({ id, messageCount }) => {
                    _user.lastSeenMessages[id] = messageCount;
                });

                return _user;
            });
            invariantBadRequest(updated);

            return jsonResponse(updated);
        },
    );

    [User.MarkTextChatAsRead.NamedAction] = route<
        User.MarkTextChatAsRead.RequestBody,
        User.MarkTextChatAsRead.Response
    >(User.MarkTextChatAsRead)(
        withAuth,
        async ({ body, auth }) => {
            const textChat = db.getById('textChat', body.textChatId);
            invariantBadRequest(textChat);

            const updated = await db.update('user', auth.id, (_user) => ({
                ..._user,
                lastSeenMessages: {
                    ..._user.lastSeenMessages,
                    [textChat.id]: textChat.messageCount,
                },
            }));
            invariantBadRequest(updated);

            return jsonResponse(updated);
        },
    );

    [User.MuteConversation.NamedAction] = route<
        User.MuteConversation.RequestBody,
        User.MuteConversation.Response
    >(User.MuteConversation)(
        withAuth,
        async ({ body, auth }) => {
            const updated = await db.update('user', auth.id, (_user) => ({
                ..._user,
                mutedConversations: [
                    ..._user.mutedConversations,
                    body.conversationId,
                ],
            }));
            invariantBadRequest(updated);

            return jsonResponse(updated);
        },
    );

    [User.MuteServer.NamedAction] = route<
        User.MuteServer.RequestBody,
        User.MuteServer.Response
    >(User.MuteServer)(
        withAuth,
        async ({ body, auth }) => {
            const updated = await db.update('user', auth.id, (_user) => ({
                ..._user,
                mutedServers: [
                    ..._user.mutedServers,
                    body.serverId,
                ],
            }));
            invariantBadRequest(updated);

            return jsonResponse(updated);
        },
    );

    [User.ProfileUpdate.NamedAction] = route<
        User.ProfileUpdate.RequestBody,
        User.ProfileUpdate.Response
    >(User.ProfileUpdate)(
        withAuth,
        async ({ auth, body }) => {
            const user = await db.update('user', auth.id, async (userToUpdate) => {
                if (
                    'avatar' in body
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
            invariantBadRequest(user);

            return jsonResponse(user);
        },
    );

    [User.Refresh.NamedAction] = route<
        User.Refresh.RequestBody,
        User.Refresh.Response
    >(User.Refresh)(
        async ({ body, auth }) => {
            const user = db.getOne('user', (item) => {
                return item.refreshToken === body.refreshToken;
            });
            invariantBadRequest(user);

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
            invariantBadRequest(updatedUser);

            const populatedUser = await setupScenarioIfNeeded(user.id);

            return jsonResponse({
                userData: populatedUser,
                ...await getAppData(populatedUser.id),
            });
        },
    );

    [User.Registration.NamedAction] = route<
        User.Registration.RequestBody,
        User.Registration.Response
    >(User.Registration)(
        async ({ body, auth }) => {
            const isExist = db.getOne('user', (item) => {
                return item.login === body.login;
            });
            invariantBadRequest(isExist);

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
    );

    [User.RejectFriendRequest.NamedAction] = route<
        User.RejectFriendRequest.RequestBody,
        User.RejectFriendRequest.Response
    >(User.RejectFriendRequest)(
        withAuth,
        async ({ body, auth }) => {
            const updated = await db.update('user', auth.id, (_user) => ({
                ..._user,
                incomingFriendRequests: (
                    _user.incomingFriendRequests.filter((v) => {
                        return v.from !== body.targetId;
                    })
                ),
            }));
            invariantBadRequest(updated);

            await db.update('user', body.targetId, (_user) => ({
                ..._user,
                outgoingFriendRequests: (
                    _user.outgoingFriendRequests.filter((v) => {
                        return v.to !== auth.id;
                    })
                ),
            }));

            return jsonResponse(updated);
        },
    );

    [User.RevokeFriendRequest.NamedAction] = route<
        User.RevokeFriendRequest.RequestBody,
        User.RevokeFriendRequest.Response
    >(User.RevokeFriendRequest)(
        withAuth,
        async ({ body, auth }) => {
            const updated = await db.update('user', auth.id, (_user) => ({
                ..._user,
                outgoingFriendRequests: (
                    _user.outgoingFriendRequests.filter((v) => {
                        return v.to !== body.targetId;
                    })
                ),
            }));
            invariantBadRequest(updated);

            await db.update('user', body.targetId, (_user) => ({
                ..._user,
                incomingFriendRequests: (
                    _user.incomingFriendRequests.filter((v) => {
                        return v.from !== auth.id;
                    })
                ),
            }));

            return jsonResponse(updated);
        },
    );

    [User.SendFriendRequest.NamedAction] = route<
        User.SendFriendRequest.RequestBody,
        User.SendFriendRequest.Response
    >(User.SendFriendRequest)(
        withAuth,
        async ({ body, auth }) => {
            const time = Date.now();

            const updated = await db.update('user', auth.id, (_user) => ({
                ..._user,
                outgoingFriendRequests: [
                    ..._user.outgoingFriendRequests,
                    {
                        to: body.targetId,
                        createdAt: time,
                    },
                ],
            }));
            invariantBadRequest(updated);

            await db.update('user', body.targetId, (_user) => ({
                ..._user,
                incomingFriendRequests: [
                    ..._user.incomingFriendRequests,
                    {
                        createdAt: time,
                        from: auth.id,
                    },
                ],
            }));

            return jsonResponse(updated);
        },
    );

    [User.Unblock.NamedAction] = route<
        User.Unblock.RequestBody,
        User.Unblock.Response
    >(User.Unblock)(
        withAuth,
        async ({ body, auth }) => {
            const updated = await db.update('user', auth.id, (_user) => ({
                ..._user,
                blocked: _user.blocked.filter((id) => id !== body.targetId),
            }));
            invariantBadRequest(updated);

            return jsonResponse(updated);
        },
    );

    [User.UnmuteConversation.NamedAction] = route<
        User.UnmuteConversation.RequestBody,
        User.UnmuteConversation.Response
    >(User.UnmuteConversation)(
        withAuth,
        async ({ body, auth }) => {
            const updated = await db.update('user', auth.id, (_user) => ({
                ..._user,
                mutedConversations: (
                    _user.mutedConversations.filter((id) => {
                        return id !== body.conversationId;
                    })
                ),
            }));
            invariantBadRequest(updated);

            return jsonResponse(updated);
        },
    );

    [User.UnmuteServer.NamedAction] = route<
        User.UnmuteServer.RequestBody,
        User.UnmuteServer.Response
    >(User.UnmuteServer)(
        withAuth,
        async ({ body, auth }) => {
            const updated = await db.update('user', auth.id, (_user) => ({
                ..._user,
                mutedServers: (
                    _user.mutedServers.filter((id) => {
                        return id !== body.serverId;
                    })
                ),
            }));
            invariantBadRequest(updated);

            return jsonResponse(updated);
        },
    );
}

class ServerRoutes {
    [Server.AcceptInvitation.NamedAction] = route<
        Server.AcceptInvitation.RequestBody,
        Server.AcceptInvitation.Response
    >(Server.AcceptInvitation)(
        withAuth,
        async ({ body, auth }) => {
            const server = db.getOne('server', (v) => {
                return v.invitations.some((v) => {
                    return v.code === body.invitationCode;
                });
            });
            invariantBadRequest(server);

            await db.update(
                'server', server.id, (_server) => ({
                    ..._server,
                    members: [
                        ..._server.members,
                        auth.id,
                    ],
                    memberCount: _server.memberCount + 1,
                }),
            );

            const updated = await db.update('user', auth.id, (_user) => ({
                ..._user,
                servers: [
                    ..._user.servers,
                    server.id,
                ],
            }));
            invariantBadRequest(updated);

            return jsonResponse(updated);
        },
    );

    [Server.BanMember.NamedAction] = route<
        Server.BanMember.RequestBody,
        Server.BanMember.Response
    >(Server.BanMember)(
        withAuth,
        async ({ body, auth }) => {
            await db.update('server', body.serverId, (_server) => ({
                ..._server,
                banned: [
                    ..._server.banned,
                    body.targetId,
                ],
            }));
        },
    );

    [Server.Create.NamedAction] = route<
        Server.Create.RequestBody,
        Server.Create.Response
    >(Server.Create)(
        withAuth,
        async ({ body, auth }) => {
            const server = db.getOne('server', (item) => {
                return item.identifier === body.identifier;
            });
            invariantBadRequest(server);

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
    );

    [Server.Delete.NamedAction] = route<
        Server.Delete.RequestBody,
        Server.Delete.Response
    >(Server.Delete)(
        withAuth,
        async ({ body, auth }) => {
            const server = db.getById('server', body.serverId);
            invariantBadRequest(server);

            await db.delete('server', body.serverId);

            // omit recursive data deletion
        },
    );

    [Server.GetBannedUsers.NamedAction] = route<
        Server.GetBannedUsers.RequestBody,
        Server.GetBannedUsers.Response
    >(Server.GetBannedUsers)(
        withAuth,
        async ({ body, auth }) => {
            const server = db.getById('server', body.serverId);
            invariantBadRequest(server);

            const bannedUsers = db.getByIds('user', server.banned);

            const limitedUsers = bannedUsers.slice(0, (
                body.limit ?? bannedUsers.length
            )).filter(Boolean);

            return jsonResponse({
                User: limitedUsers,
            });
        },
    );

    [Server.GetByInvitationCode.NamedAction] = route<
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
            invariantBadRequest(server);

            return jsonResponse(server);
        },
    );

    [Server.GetMany.NamedAction] = route<
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
    );

    [Server.GetManyDeep.NamedAction] = route<
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
    );

    [Server.GetMembers.NamedAction] = route<
        Server.GetMembers.RequestBody,
        Server.GetMembers.Response
    >(Server.GetMembers)(
        withAuth,
        async ({ body, auth }) => {
            const server = db.getById('server', body.serverId);
            invariantBadRequest(server);

            const members = db.getByIds('user', server.members);

            const limitedMembers = members.slice(0, (
                body.limit ?? members.length
            )).filter(Boolean);

            return jsonResponse({
                User: limitedMembers,
            });
        },
    );

    [Server.KickMember.NamedAction] = route<
        Server.KickMember.RequestBody,
        Server.KickMember.Response
    >(Server.KickMember)(
        withAuth,
        async ({ body, auth }) => {
            await db.update('server', body.serverId, (_server) => ({
                ..._server,
                members: _server.members.filter((id) => id !== body.targetId),
                memberCount: _server.memberCount - 1,
            }));

            await db.update('user', body.targetId, (_user) => ({
                ..._user,
                servers: _user.servers.filter((id) => id !== body.serverId),
            }));
        },
    );

    [Server.Leave.NamedAction] = route<
        Server.Leave.RequestBody,
        Server.Leave.Response
    >(Server.Leave)(
        withAuth,
        async ({ body, auth }) => {
            await db.update('user', auth.id, (_user) => ({
                ..._user,
                servers: _user.servers.filter((id) => id !== body.serverId),
            }));

            const server = await db.update(
                'server', body.serverId, (_server) => ({
                    ..._server,
                    members: _server.members.filter((id) => id !== auth.id),
                    memberCount: _server.memberCount - 1,
                }),
            );
            invariantBadRequest(server);

            if (auth.id === server.owner) {
                await db.delete('server', body.serverId);
                // omit recursive data deletion
            }
        },
    );

    [Server.UnBanMember.NamedAction] = route<
        Server.UnBanMember.RequestBody,
        Server.UnBanMember.Response
    >(Server.UnBanMember)(
        withAuth,
        async ({ body, auth }) => {
            await db.update('server', body.serverId, (_server) => ({
                ..._server,
                banned: _server.banned.filter((id) => id !== body.targetId),
            }));
        },
    );

    [Server.Update.NamedAction] = route<
        Server.Update.RequestBody,
        Server.Update.Response
    >(Server.Update)(
        withAuth,
        async ({ body, auth }) => {
            const updated = await db.update(
                'server', body.serverId, async (_server) => {
                    if ('avatar' in body && _server.avatar) {
                        await db.delete('file', _server.avatar);
                    }

                    if (body.avatar === null) {
                        _server.avatar = body.avatar;
                    }

                    if (body.avatar) {
                        const avatar = await db.create(
                            'file',
                            Dummies.file(body.avatar),
                        );

                        _server.avatar = avatar.id;
                    }

                    if (body.name) {
                        _server.name = body.name;
                    }

                    return _server;
                },
            );
            invariantBadRequest(updated);

            return jsonResponse(updated);
        },
    );
}

class ChannelRoutes {
    [Channel.Create.NamedAction] = route<
        Channel.Create.RequestBody,
        Channel.Create.Response
    >(Channel.Create)(
        withAuth,
        async ({ body, auth }) => {
            const channelId = uuid();

            const textChat = await db.create(
                'textChat',
                Dummies.textChatChannel({
                    id: uuid(),
                    channel: channelId,
                    messages: [],
                    server: body.serverId,
                }),
            );

            const channel = await db.create('channel', Dummies.channel({
                id: channelId,
                name: body.name,
                roleWhitelist: [],
                server: body.serverId,
                textChat: textChat.id,
            }));

            await db.update('server', body.serverId, (_server) => ({
                ..._server,
                channels: [
                    ..._server.channels,
                    channel.id,
                ],
            }));

            return jsonResponse(channel);
        },
    );

    [Channel.Delete.NamedAction] = route<
        Channel.Delete.RequestBody,
        Channel.Delete.Response
    >(Channel.Delete)(
        withAuth,
        async ({ body, auth }) => {
            const channel = db.getById('channel', body.channelId);
            invariantBadRequest(channel);

            await db.delete('channel', body.channelId);

            await db.update('server', channel.server, (_server) => ({
                ..._server,
                channels: _server.channels.filter((id) => id !== channel.id),
            }));
        },
    );

    [Channel.GetMany.NamedAction] = route<
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
    );

    [Channel.Update.NamedAction] = route<
        Channel.Update.RequestBody,
        Channel.Update.Response
    >(Channel.Update)(
        withAuth,
        async ({ body, auth }) => {
            const updated = await db.update(
                'channel', body.channelId, (_channel) => ({
                    ..._channel,
                    name: body.name ?? _channel.name,
                }),
            );
            invariantBadRequest(updated);

            return jsonResponse(updated);
        },
    );
}

class ConversationRoutes {
    [Conversation.Create.NamedAction] = route<
        Conversation.Create.RequestBody,
        Conversation.Create.Response
    >(Conversation.Create)(
        withAuth,
        async ({ body, auth }) => {
            const conversationId = uuid();

            const textChat = await db.create(
                'textChat', Dummies.textChatConversation({
                    id: uuid(),
                    conversation: conversationId,
                    messages: [],
                }),
            );

            const conversation = await db.create(
                'conversation', Dummies.conversation({
                    id: conversationId,
                    members: [auth.id, body.targetId],
                    textChat: textChat.id,
                }),
            );

            return jsonResponse(conversation);
        },
    );

    [Conversation.GetMany.NamedAction] = route<
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
    );

    [Conversation.GetManyDeep.NamedAction] = route<
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
    );
}

class TextChatRoutes {
    [TextChat.GetMany.NamedAction] = route<
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
    );
}

class MessageRoutes {
    [Message.Edit.NamedAction] = route<
        Message.Edit.RequestBody,
        Message.Edit.Response
    >(Message.Edit)(
        withAuth,
        async ({ body, auth }) => {
            const updated = await db.update(
                'message', body.messageId, (_message) => ({
                    ..._message,
                    content: body.content,
                }),
            );
            invariantBadRequest(updated);

            return jsonResponse(updated);
        },
    );

    [Message.GetManyByTextChatId.NamedAction] = route<
        Message.GetManyByTextChatId.RequestBody,
        Message.GetManyByTextChatId.Response
    >(Message.GetManyByTextChatId)(
        withAuth,
        async ({ body, auth }) => {
            const textChat = db.getById('textChat', body.textChatId);
            invariantBadRequest(textChat);

            const sliceTo = body.from ?? textChat.messageCount;
            const sliceFrom = Math.max(0, sliceTo - body.limit);

            const messages = db.getByIds(
                'message',
                textChat.messages.slice(sliceFrom, sliceTo),
            );

            return jsonResponse(messages);
        },
    );

    [Message.Send.NamedAction] = route<
        Message.Send.RequestBody,
        Message.Send.Response
    >(Message.Send)(
        withAuth,
        async ({ body, auth }) => {
            const attachments = await Promise.all(
                body.attachments.map(async (encodedFile) => {
                    const file = await db.create(
                        'file', Dummies.file(encodedFile),
                    );

                    const attachment: ClientEntities.Message.Attachment = {
                        id: file.id,
                        type: file.type.includes('image') ? 'image' : 'file',
                    };

                    return attachment;
                }),
            );

            const maybeChannel = db.getOne(
                'channel', (v) => v.textChat === body.textChatId,
            );

            const maybeConversation = db.getOne(
                'conversation', (v) => v.textChat === body.textChatId,
            );

            invariantBadRequest(maybeChannel ?? maybeConversation);

            const textChatId = (
                maybeChannel?.textChat
                ?? maybeConversation?.textChat
            );
            invariantBadRequest(textChatId);

            const textChat = db.getById('textChat', textChatId);
            invariantBadRequest(textChat);

            let message: ClientEntities.Message.Base;

            if (maybeChannel) {
                message = await db.create('message', Dummies.message({
                    id: uuid(),
                    attachments,
                    author: auth.id,
                    channel: maybeChannel.id,
                    textChat: textChat.id,
                    server: maybeChannel.server,
                    conversation: null,
                    content: body.content,
                    index: textChat.messageCount,
                }));
            } else {
                invariantBadRequest(maybeConversation);

                message = await db.create('message', Dummies.message({
                    id: uuid(),
                    attachments,
                    author: auth.id,
                    channel: null,
                    textChat: textChat.id,
                    server: null,
                    conversation: maybeConversation.id,
                    content: body.content,
                    index: textChat.messageCount,
                }));
            }

            await db.update('textChat', textChat.id, (_textChat) => ({
                ..._textChat,
                messages: [
                    ..._textChat.messages,
                    message.id,
                ],
                messageCount: _textChat.messageCount + 1,
            }));

            return jsonResponse(message);
        },
    );

    [Message.ToggleReaction.NamedAction] = route<
        Message.ToggleReaction.RequestBody,
        Message.ToggleReaction.Response
    >(Message.ToggleReaction)(
        withAuth,
        async ({ body, auth }) => {
            const updated = await db.update(
                'message', body.messageId, (_message) => {
                    const reaction = _message.reactions.find((v) => {
                        return v.code === body.code;
                    });

                    if (reaction) {
                        reaction.users.push(auth.id);
                    }

                    if (!reaction) {
                        _message.reactions.push({
                            code: body.code,
                            users: [auth.id],
                        });
                    }

                    return _message;
                },
            );
            invariantBadRequest(updated);

            return jsonResponse(updated);
        },
    );
}

class FileRoutes {
    [File.Read.NamedAction] = http[File.Read.Method](
        `${env._PUBLIC_SERVER_URL}${File.Read.Path}/:fileId`,
        async ({ params }) => {
            await delay();

            const { fileId } = params as { fileId: string };
            invariantBadRequest(fileId);

            const file = db.getById('file', fileId);
            invariantBadRequest(file);

            const base64Data = extractBase64Data(file);
            invariantBadRequest(base64Data);

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
    );
}

class RoleRoutes {
    [Role.GetMany.NamedAction] = route<
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
    );
}

export const getRoutes = () => [
    ...Object.values({ ...new UserRoutes() }),
    ...Object.values({ ...new ServerRoutes() }),
    ...Object.values({ ...new ChannelRoutes() }),
    ...Object.values({ ...new ConversationRoutes() }),
    ...Object.values({ ...new TextChatRoutes() }),
    ...Object.values({ ...new MessageRoutes() }),
    ...Object.values({ ...new FileRoutes() }),
    ...Object.values({ ...new RoleRoutes() }),
];