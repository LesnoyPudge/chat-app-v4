import { C } from '@root';
import { T } from '@lesnoypudge/types-utils-base/namespace';


const v1 = <_Value extends string>(path: _Value) => `/api/v1${path}` as const;

const capitalize = <_Value extends string>(
    word: _Value,
): Capitalize<_Value> => {
    return word.charAt(0).toUpperCase() + word.slice(1) as Capitalize<_Value>;
};

const actionNameWithEndpoint = <
    _EndpointName extends keyof typeof Endpoints.V1,
    _Action extends string,
>(
    name: _EndpointName,
    action: _Action,
) => {
    return `${name}${capitalize(action)}` as const;
};

export namespace Endpoints {
    export namespace V1 {
        export namespace User {
            export namespace Registration {
                export const Path = v1('/user/registration');

                export const ActionName = 'registration';

                export const ActionNameWithEndpoint = actionNameWithEndpoint(
                    C.ENTITY_NAMES.USER,
                    ActionName,
                );

                export const Method = C.METHOD.POST;

                export type RequestBody = {
                    login: string;
                    username: string;
                    password: string;
                    email?: string;
                };

                export type Response = T.Entities.User.WithoutCredentials;
            }

            export namespace Login {
                export const Path = v1('/user/login');

                export const ActionName = 'login';

                export const ActionNameWithEndpoint = actionNameWithEndpoint(
                    C.ENTITY_NAMES.USER,
                    ActionName,
                );

                export const Method = C.METHOD.POST;

                export type RequestBody = {
                    login: string;
                    password: string;
                };

                export type Response = T.Entities.User.WithoutCredentials;
            }

            export namespace Logout {
                export const Path = v1('/user/logout');

                export const ActionName = 'logout';

                export const ActionNameWithEndpoint = actionNameWithEndpoint(
                    C.ENTITY_NAMES.USER,
                    ActionName,
                );

                export const Method = C.METHOD.POST;

                export type RequestBody = void;

                export type Response = void;
            }

            export namespace Refresh {
                export const Path = v1('/user/refresh');

                export const ActionName = 'refresh';

                export const ActionNameWithEndpoint = actionNameWithEndpoint(
                    C.ENTITY_NAMES.USER,
                    ActionName,
                );

                export const Method = C.METHOD.GET;

                export type RequestBody = void;

                export type Response = T.Entities.User.WithoutCredentials;
            }

            export namespace GetOne {
                export const Path = v1('/user');

                export const ActionName = 'getOne';

                export const ActionNameWithEndpoint = actionNameWithEndpoint(
                    C.ENTITY_NAMES.USER,
                    ActionName,
                );

                export const Method = C.METHOD.GET;

                export type RequestBody = T.WithTargetId;

                export type Response = T.Entities.User.WithoutCredentials;
            }

            export namespace ProfileUpdate {
                export const Path = v1('/user/profile/update');

                export const ActionName = 'profileUpdate';

                export const ActionNameWithEndpoint = actionNameWithEndpoint(
                    C.ENTITY_NAMES.USER,
                    ActionName,
                );

                export const Method = C.METHOD.POST;

                export type RequestBody = T.Simplify<Partial<Pick<
                    T.Entities.User.Default,
                    'username' | 'settings' | 'extraStatus'
                > & T.Override<
                    T.Entities.User.Default,
                    'avatar',
                    T.Entities.File.Encoded | null
                >>>;

                export type Response = T.Entities.User.WithoutCredentials;
            }

            export namespace CredentialsUpdate {
                export const Path = v1('/user/credentials/update');

                export const ActionName = 'credentialsUpdate';

                export const ActionNameWithEndpoint = actionNameWithEndpoint(
                    C.ENTITY_NAMES.USER,
                    ActionName,
                );

                export const Method = C.METHOD.POST;

                export type RequestBody = T.Simplify<Pick<
                    T.Entities.User.Credentials,
                    'password'
                > & T.RequireAtLeastOne<{
                    newPassword: string;
                    newEmail: string;
                    newLogin: string;
                }>>;

                export type Response = T.Entities.User.WithoutCredentials;
            }

            export namespace Delete {
                export const Path = v1('/user/delete');

                export const ActionName = 'delete';

                export const ActionNameWithEndpoint = actionNameWithEndpoint(
                    C.ENTITY_NAMES.USER,
                    ActionName,
                );

                export const Method = C.METHOD.POST;

                export type RequestBody = void;

                export type Response = void;
            }

            export namespace Block {
                export const Path = v1('/user/block');

                export const ActionName = 'block';

                export const ActionNameWithEndpoint = actionNameWithEndpoint(
                    C.ENTITY_NAMES.USER,
                    ActionName,
                );

                export const Method = C.METHOD.POST;

                export type RequestBody = T.WithTargetId;

                export type Response = T.Entities.User.WithoutCredentials;
            }

            export namespace Unblock {
                export const Path = v1('/user/unblock');

                export const ActionName = 'unblock';

                export const ActionNameWithEndpoint = actionNameWithEndpoint(
                    C.ENTITY_NAMES.USER,
                    ActionName,
                );

                export const Method = C.METHOD.POST;

                export type RequestBody = T.WithTargetId;

                export type Response = T.Entities.User.WithoutCredentials;
            }

            export namespace RequestAccessCode {
                export const Path = v1('/user/access-code/request');

                export const ActionName = 'requestAccessCode';

                export const ActionNameWithEndpoint = actionNameWithEndpoint(
                    C.ENTITY_NAMES.USER,
                    ActionName,
                );

                export const Method = C.METHOD.POST;

                export type RequestBody = void;

                export type Response = void;
            }

            export namespace VerifyAccessCode {
                export const Path = v1('/user/access-code/verify');

                export const ActionName = 'verifyAccessCode';

                export const ActionNameWithEndpoint = actionNameWithEndpoint(
                    C.ENTITY_NAMES.USER,
                    ActionName,
                );

                export const Method = C.METHOD.POST;

                export type RequestBody = Pick<
                    T.Override<
                        T.Entities.User.Credentials,
                        'accessCode', string
                    >,
                    'accessCode'
                >;

                export type Response = void;
            }

            export namespace SendFriendRequest {
                export const Path = v1('/user/friend-request/send');

                export const ActionName = 'sendFriendRequest';

                export const ActionNameWithEndpoint = actionNameWithEndpoint(
                    C.ENTITY_NAMES.USER,
                    ActionName,
                );

                export const Method = C.METHOD.POST;

                export type RequestBody = T.WithTargetId;

                export type Response = T.Entities.User.WithoutCredentials;
            }

            export namespace AcceptFriendRequest {
                export const Path = v1('/user/friend-request/accept');

                export const ActionName = 'acceptFriendRequest';

                export const ActionNameWithEndpoint = actionNameWithEndpoint(
                    C.ENTITY_NAMES.USER,
                    ActionName,
                );

                export const Method = C.METHOD.POST;

                export type RequestBody = T.WithTargetId;

                export type Response = T.Entities.User.WithoutCredentials;
            }

            export namespace DeclineFriendRequest {
                export const Path = v1('/user/friend-request/decline');

                export const ActionName = 'declineFriendRequest';

                export const ActionNameWithEndpoint = actionNameWithEndpoint(
                    C.ENTITY_NAMES.USER,
                    ActionName,
                );

                export const Method = C.METHOD.POST;

                export type RequestBody = T.WithTargetId;

                export type Response = T.Entities.User.WithoutCredentials;
            }

            export namespace RevokeFriendRequest {
                export const Path = v1('/user/friend-request/revoke');

                export const ActionName = 'revokeFriendRequest';

                export const ActionNameWithEndpoint = actionNameWithEndpoint(
                    C.ENTITY_NAMES.USER,
                    ActionName,
                );

                export const Method = C.METHOD.POST;

                export type RequestBody = T.WithTargetId;

                export type Response = T.Entities.User.WithoutCredentials;
            }

            export namespace DeleteFriend {
                export const Path = v1('/user/friend/delete');

                export const ActionName = 'deleteFriend';

                export const ActionNameWithEndpoint = actionNameWithEndpoint(
                    C.ENTITY_NAMES.USER,
                    ActionName,
                );

                export const Method = C.METHOD.POST;

                export type RequestBody = T.WithTargetId;

                export type Response = T.Entities.User.WithoutCredentials;
            }

            export namespace HidePrivateChannel {
                export const Path = v1('/user/hide-private-channel');

                export const ActionName = 'hidePrivateChannel';

                export const ActionNameWithEndpoint = actionNameWithEndpoint(
                    C.ENTITY_NAMES.USER,
                    ActionName,
                );

                export const Method = C.METHOD.POST;

                export type RequestBody = T.WithPrivateChannelId;

                export type Response = T.Entities.User.WithoutCredentials;
            }
        }

        export namespace Channel {
            export namespace Create {
                export const Path = v1('/channel/create');

                export const ActionName = 'create';

                export const ActionNameWithEndpoint = actionNameWithEndpoint(
                    C.ENTITY_NAMES.CHANNEL,
                    ActionName,
                );

                export const Method = C.METHOD.POST;

                export type RequestBody = T.Simplify<Pick<
                    T.Entities.Channel.Default,
                    'name' | 'identifier'
                > & Pick<T.Override<
                    T.Entities.Channel.Default,
                    'avatar',
                    T.Entities.File.Encoded
                >, 'avatar'>>;

                export type Response = T.Entities.Channel.Default;
            }

            export namespace GetOne {
                export const Path = v1('/channel');

                export const ActionName = 'getOne';

                export const ActionNameWithEndpoint = actionNameWithEndpoint(
                    C.ENTITY_NAMES.CHANNEL,
                    ActionName,
                );

                export const Method = C.METHOD.GET;

                export type RequestBody = T.WithChannelId;

                export type Response = T.Entities.Channel.Default;
            }

            export namespace Update {
                export const Path = v1('/channel/update');

                export const ActionName = 'update';

                export const ActionNameWithEndpoint = actionNameWithEndpoint(
                    C.ENTITY_NAMES.CHANNEL,
                    ActionName,
                );

                export const Method = C.METHOD.POST;

                export type RequestBody = T.Simplify<
                    T.WithChannelId
                    & T.RequireAtLeastOne<
                        Pick<
                            T.Entities.Channel.Default,
                            'name'
                        > & Pick<
                            T.Override<
                                T.Entities.Channel.Default,
                                'avatar',
                                T.Entities.File.Encoded | null
                            >,
                            'avatar'
                        >
                    >
                >;

                export type Response = T.Entities.Channel.Default;
            }

            export namespace Delete {
                export const Path = v1('/channel/delete');

                export const ActionName = 'delete';

                export const ActionNameWithEndpoint = actionNameWithEndpoint(
                    C.ENTITY_NAMES.CHANNEL,
                    ActionName,
                );

                export const Method = C.METHOD.POST;

                export type RequestBody = T.WithChannelId;

                export type Response = void;
            }

            export namespace Leave {
                export const Path = v1('/channel/leave');

                export const ActionName = 'leave';

                export const ActionNameWithEndpoint = actionNameWithEndpoint(
                    C.ENTITY_NAMES.CHANNEL,
                    ActionName,
                );

                export const Method = C.METHOD.POST;

                export type RequestBody = T.WithChannelId;

                export type Response = void;
            }

            export namespace Kick {
                export const Path = v1('/channel/kick');

                export const ActionName = 'kick';

                export const ActionNameWithEndpoint = actionNameWithEndpoint(
                    C.ENTITY_NAMES.CHANNEL,
                    ActionName,
                );

                export const Method = C.METHOD.POST;

                export type RequestBody = T.WithChannelId & T.WithTargetId;

                export type Response = T.Entities.Channel.Default;
            }

            export namespace Ban {
                export const Path = v1('/channel/ban');

                export const ActionName = 'ban';

                export const ActionNameWithEndpoint = actionNameWithEndpoint(
                    C.ENTITY_NAMES.CHANNEL,
                    ActionName,
                );

                export const Method = C.METHOD.POST;

                export type RequestBody = T.Simplify<
                    T.WithChannelId
                    & T.WithTargetId
                    & Pick<
                        T.Entities.Channel.Default['banned'][number],
                        'reason'
                    >
                >;

                export type Response = T.Entities.Channel.Default;
            }

            export namespace Unban {
                export const Path = v1('/channel/unban');

                export const ActionName = 'unban';

                export const ActionNameWithEndpoint = actionNameWithEndpoint(
                    C.ENTITY_NAMES.CHANNEL,
                    ActionName,
                );

                export const Method = C.METHOD.POST;

                export type RequestBody = T.WithTargetId & T.WithChannelId;

                export type Response = T.Entities.Channel.Default;
            }

            export namespace CreateInvitation {
                export const Path = v1('/channel/invitation/create');

                export const ActionName = 'createInvitation';

                export const ActionNameWithEndpoint = actionNameWithEndpoint(
                    C.ENTITY_NAMES.CHANNEL,
                    ActionName,
                );

                export const Method = C.METHOD.POST;

                export type RequestBody = T.Simplify<T.WithChannelId & Pick<
                    T.Entities.Channel.Default['invitations'][number],
                    'expiresAt'
                >>;

                export type Response = T.Entities.Channel.Default;
            }

            export namespace AcceptInvitation {
                export const Path = v1('/channel/invitation/accept');

                export const ActionName = 'acceptInvitation';

                export const ActionNameWithEndpoint = actionNameWithEndpoint(
                    C.ENTITY_NAMES.CHANNEL,
                    ActionName,
                );

                export const Method = C.METHOD.POST;

                export type RequestBody = T.Simplify<Pick<
                    T.Entities.Channel.Default['invitations'][number],
                    'code'
                >>;

                export type Response = T.Entities.Channel.Default;
            }

            export namespace DeleteInvitation {
                export const Path = v1('/channel/invitation/delete');

                export const ActionName = 'deleteInvitation';

                export const ActionNameWithEndpoint = actionNameWithEndpoint(
                    C.ENTITY_NAMES.CHANNEL,
                    ActionName,
                );

                export const Method = C.METHOD.POST;

                export type RequestBody = T.Simplify<T.WithChannelId & Pick<
                    T.Entities.Channel.Default['invitations'][number],
                    'code'
                >>;

                export type Response = T.Entities.Channel.Default;
            }
        }

        export namespace Room {
            export namespace Create {
                export const Path = v1('/room/create');

                export const ActionName = 'create';

                export const ActionNameWithEndpoint = actionNameWithEndpoint(
                    C.ENTITY_NAMES.ROOM,
                    ActionName,
                );

                export const Method = C.METHOD.POST;

                export type RequestBody = T.Simplify<T.WithChannelId & Pick<
                    T.Entities.Room.Default,
                    'name' | 'type' | 'isPrivate' | 'whiteList'
                >>;

                export type Response = T.Entities.Room.Default;
            }

            export namespace GetOne {
                export const Path = v1('/room');

                export const ActionName = 'getOne';

                export const ActionNameWithEndpoint = actionNameWithEndpoint(
                    C.ENTITY_NAMES.ROOM,
                    ActionName,
                );

                export const Method = C.METHOD.GET;

                export type RequestBody = T.WithChannelId & T.WithRoomId;

                export type Response = T.Entities.Room.Default;
            }

            export namespace Update {
                export const Path = v1('/room/update');

                export const ActionName = 'update';

                export const ActionNameWithEndpoint = actionNameWithEndpoint(
                    C.ENTITY_NAMES.ROOM,
                    ActionName,
                );

                export const Method = C.METHOD.POST;

                export type RequestBody = T.Simplify<
                    T.WithChannelId
                    & T.WithRoomId
                    & T.RequireAtLeastOne<Pick<
                        T.Entities.Room.Default,
                        'name' | 'type' | 'isPrivate' | 'whiteList'
                    >>
                >;

                export type Response = T.Entities.Room.Default;
            }

            export namespace Delete {
                export const Path = v1('/room/delete');

                export const ActionName = 'delete';

                export const ActionNameWithEndpoint = actionNameWithEndpoint(
                    C.ENTITY_NAMES.ROOM,
                    ActionName,
                );

                export const Method = C.METHOD.POST;

                export type RequestBody = T.WithChannelId & T.WithRoomId;

                export type Response = void;
            }
        }

        export namespace Role {
            export namespace Create {
                export const Path = v1('/role/create');

                export const ActionName = 'create';

                export const ActionNameWithEndpoint = actionNameWithEndpoint(
                    C.ENTITY_NAMES.ROLE,
                    ActionName,
                );

                export const Method = C.METHOD.POST;

                export type RequestBody = T.WithChannelId & Pick<
                    T.Entities.Role.Default,
                    'name'
                >;

                export type Response = T.Entities.Role.Default;
            }

            export namespace GetOne {
                export const Path = v1('/role');

                export const ActionName = 'getOne';

                export const ActionNameWithEndpoint = actionNameWithEndpoint(
                    C.ENTITY_NAMES.ROLE,
                    ActionName,
                );

                export const Method = C.METHOD.GET;

                export type RequestBody = T.WithChannelId & T.WithRoleId;

                export type Response = T.Entities.Role.Default;
            }

            export namespace Update {
                export const Path = v1('/role/update');

                export const ActionName = 'update';

                export const ActionNameWithEndpoint = actionNameWithEndpoint(
                    C.ENTITY_NAMES.ROLE,
                    ActionName,
                );

                export const Method = C.METHOD.POST;

                export type RequestBody = T.Simplify<
                    T.WithChannelId
                    & T.WithRoleId
                    & T.RequireAtLeastOne<
                        Pick<
                            T.Entities.Role.Default,
                            'color' | 'isDefault' | 'name' | 'permissions'
                        >
                        & Pick<
                            T.Override<
                                T.Entities.Role.Default,
                                'image',
                                T.Entities.File.Encoded | null
                            >,
                            'image'
                        >
                    >
                >;

                export type Response = T.Entities.Role.Default;
            }

            export namespace Delete {
                export const Path = v1('/role/delete');

                export const ActionName = 'delete';

                export const ActionNameWithEndpoint = actionNameWithEndpoint(
                    C.ENTITY_NAMES.ROLE,
                    ActionName,
                );

                export const Method = C.METHOD.POST;

                export type RequestBody = T.WithChannelId & T.WithRoleId;

                export type Response = void;
            }

            export namespace AddMember {
                export const Path = v1('/role/member/add');

                export const ActionName = 'addMember';

                export const ActionNameWithEndpoint = actionNameWithEndpoint(
                    C.ENTITY_NAMES.ROLE,
                    ActionName,
                );

                export const Method = C.METHOD.POST;

                export type RequestBody = (
                    T.WithChannelId
                    & T.WithRoleId
                    & T.WithTargetId
                );

                export type Response = T.Entities.Role.Default;
            }

            export namespace RemoveMember {
                export const Path = v1('/role/member/remove');

                export const ActionName = 'removeMember';

                export const ActionNameWithEndpoint = actionNameWithEndpoint(
                    C.ENTITY_NAMES.ROLE,
                    ActionName,
                );

                export const Method = C.METHOD.POST;

                export type RequestBody = (
                    T.WithChannelId
                    & T.WithRoleId
                    & T.WithTargetId
                );

                export type Response = T.Entities.Role.Default;
            }
        }

        export namespace PrivateChannel {
            export namespace Create {
                export const Path = v1('/private-channel/create');

                export const ActionName = 'create';

                export const ActionNameWithEndpoint = actionNameWithEndpoint(
                    C.ENTITY_NAMES.PRIVATE_CHANNEL,
                    ActionName,
                );

                export const Method = C.METHOD.POST;

                export type RequestBody = T.WithTargetId;

                export type Response = T.Entities.PrivateChannel.Default;
            }

            export namespace GetOne {
                export const Path = v1('/private-channel');

                export const ActionName = 'getOne';

                export const ActionNameWithEndpoint = actionNameWithEndpoint(
                    C.ENTITY_NAMES.PRIVATE_CHANNEL,
                    ActionName,
                );

                export const Method = C.METHOD.GET;

                export type RequestBody = T.WithPrivateChannelId;

                export type Response = T.Entities.PrivateChannel.Default;
            }
        }

        export namespace Message {
            export namespace Create {
                export const Path = v1('/message/create');

                export const ActionName = 'create';

                export const ActionNameWithEndpoint = actionNameWithEndpoint(
                    C.ENTITY_NAMES.MESSAGE,
                    ActionName,
                );

                export const Method = C.METHOD.POST;

                export type RequestBody = T.WithChatId & Partial<Pick<
                    T.Entities.Message.Default,
                    'content'
                > & T.Override<
                    T.Entities.Message.Default,
                    'attachments',
                    T.Entities.File.Encoded[]
                >>;

                export type Response = T.Entities.Message.Default;
            }

            export namespace GetOne {
                export const Path = v1('/message');

                export const ActionName = 'getOne';

                export const ActionNameWithEndpoint = actionNameWithEndpoint(
                    C.ENTITY_NAMES.MESSAGE,
                    ActionName,
                );

                export const Method = C.METHOD.GET;

                export type RequestBody = T.WithMessageId;

                export type Response = T.Entities.Message.Default;
            }

            export namespace Update {
                export const Path = v1('/message/update');

                export const ActionName = 'update';

                export const ActionNameWithEndpoint = actionNameWithEndpoint(
                    C.ENTITY_NAMES.MESSAGE,
                    ActionName,
                );

                export const Method = C.METHOD.POST;

                export type RequestBody = T.Simplify<T.WithMessageId & Pick<
                    T.Entities.Message.Default,
                    'content'
                >>;

                export type Response = T.Entities.Message.Default;
            }

            export namespace Delete {
                export const Path = v1('/message/delete');

                export const ActionName = 'delete';

                export const ActionNameWithEndpoint = actionNameWithEndpoint(
                    C.ENTITY_NAMES.MESSAGE,
                    ActionName,
                );

                export const Method = C.METHOD.POST;

                export type RequestBody = T.WithMessageId;

                export type Response = T.Entities.Message.Default;
            }

            export namespace Restore {
                export const Path = v1('/message/restore');

                export const ActionName = 'restore';

                export const ActionNameWithEndpoint = actionNameWithEndpoint(
                    C.ENTITY_NAMES.MESSAGE,
                    ActionName,
                );

                export const Method = C.METHOD.POST;

                export type RequestBody = T.WithMessageId;

                export type Response = T.Entities.Message.Default;
            }

            export namespace DeleteAttachment {
                export const Path = v1('/message/attachment/delete');

                export const ActionName = 'deleteAttachment';

                export const ActionNameWithEndpoint = actionNameWithEndpoint(
                    C.ENTITY_NAMES.MESSAGE,
                    ActionName,
                );

                export const Method = C.METHOD.POST;

                export type RequestBody = T.WithMessageId & T.WithFileId;

                export type Response = T.Entities.Message.Default;
            }
        }

        export namespace Reactions {
            export namespace Add {
                export const Path = v1('/reactions/add');

                export const ActionName = 'add';

                export const ActionNameWithEndpoint = actionNameWithEndpoint(
                    C.ENTITY_NAMES.REACTIONS,
                    ActionName,
                );

                export const Method = C.METHOD.POST;

                export type RequestBody = T.WithMessageId & {
                    code: T.EmojiCode;
                };

                export type Response = void;
            }

            export namespace Remove {
                export const Path = v1('/reactions/remove');

                export const ActionName = 'remove';

                export const ActionNameWithEndpoint = actionNameWithEndpoint(
                    C.ENTITY_NAMES.REACTIONS,
                    ActionName,
                );

                export const Method = C.METHOD.POST;

                export type RequestBody = T.WithMessageId & {
                    code: T.EmojiCode;
                };

                export type Response = void;
            }
        }

        export namespace File {
            export namespace Read {
                export const Path = v1('/file/read');

                export const ActionName = 'read';

                export const ActionNameWithEndpoint = actionNameWithEndpoint(
                    C.ENTITY_NAMES.FILE,
                    ActionName,
                );

                export const Method = C.METHOD.GET;

                export type RequestBody = T.WithFileId;

                export type Response = void;
            }

            export namespace Download {
                export const Path = v1('/file/download');

                export const ActionName = 'download';

                export const ActionNameWithEndpoint = actionNameWithEndpoint(
                    C.ENTITY_NAMES.FILE,
                    ActionName,
                );

                export const Method = C.METHOD.GET;

                export type RequestBody = T.WithFileId;

                export type Response = void;
            }
        }

        export namespace Chat {
            export namespace GetOne {
                export const Path = v1('/chat');

                export const ActionName = 'getOne';

                export const ActionNameWithEndpoint = actionNameWithEndpoint(
                    C.ENTITY_NAMES.CHAT,
                    ActionName,
                );

                export const Method = C.METHOD.POST;

                export type RequestBody = T.WithChatId;

                export type Response = T.Entities.Chat.Default;
            }
        }

        export namespace Helper {
            export namespace GetAvailableTextRoomIds {
                export const Path = v1('/helper/getAvailableTextRoomIds');

                export const ActionName = 'getAvailableTextRoomIds';

                export const ActionNameWithEndpoint = actionNameWithEndpoint(
                    'Helper',
                    ActionName,
                );

                export const Method = C.METHOD.POST;

                export type RequestBody = T.WithChannelId;

                export type Response = T.Entities.Room.Default['id'][];
            }
        }
    }
}