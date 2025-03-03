import { T } from '@lesnoypudge/types-utils-base/namespace';
import { ENTITY_NAME } from './entity';
import { HTTP_METHODS } from '@lesnoypudge/utils';
import { ClientEntities as Entities } from '@/types';



const v1 = <_Path extends string>(
    path: _Path,
): `/api/v1/${_Path}` => `/api/v1/${path}`;

const toAction = <
    _EntityName extends string,
    _Action extends string,
>(
    entityName: _EntityName,
    action: _Action,
) => {
    return [
        entityName,
        action.charAt(0).toUpperCase() + action.slice(1),
    ].join('') as `${_EntityName}${Capitalize<_Action>}`;
};



// type WithServerId = {
//     serverId: Entities.Server.Id;
// };

// type WithTextChatId = {
//     textChatId: Entities.TextChat.Id;
// };

// type WithFileId = {
//     file: Entities.File.Id;
// };

// type WithMessageId = {
//     messageId: Entities.Message.Id;
// };

// type WithConversationId = {
//     conversationId: Entities.Conversation.Id;
// };

// type WithRoleId = {
//     role: Entities.Role.Id;
// };

// type WithChannelId = {
//     channelId: Entities.Channel.Id;
// };

// type WithTargetId = {
//     targetId: Entities.User.Id;
// };

// export namespace Endpoints {
//     export namespace V1 {
//         export namespace User {
//             export namespace Registration {
//                 export const Path = v1('user/registration');

//                 export const ActionName = 'registration';

//                 export const ActionNameWithEntity = toAction(
//                     ENTITY_NAME.USER,
//                     ActionName,
//                 );

//                 export const Method = HTTP_METHODS.POST;

//                 export type RequestBody = Pick<
//                     Entities.User.Base,
//                     'login' | 'password' | 'name'
//                 >;

//                 export type Response = Entities.User.Base;
//             }

//             export namespace Login {
//                 export const Path = v1('user/login');

//                 export const ActionName = 'login';

//                 export const ActionNameWithEntity = toAction(
//                     ENTITY_NAME.USER,
//                     ActionName,
//                 );

//                 export const Method = HTTP_METHODS.POST;

//                 export type RequestBody = Pick<
//                     Entities.User.Base,
//                     'login' | 'password'
//                 >;

//                 export type Response = Entities.User.Base;
//             }

//             export namespace Logout {
//                 export const Path = v1('user/logout');

//                 export const ActionName = 'logout';

//                 export const ActionNameWithEntity = toAction(
//                     ENTITY_NAME.USER,
//                     ActionName,
//                 );

//                 export const Method = HTTP_METHODS.POST;

//                 export type RequestBody = void;

//                 export type Response = void;
//             }

//             export namespace Refresh {
//                 export const Path = v1('user/refresh');

//                 export const ActionName = 'refresh';

//                 export const ActionNameWithEntity = toAction(
//                     ENTITY_NAME.USER,
//                     ActionName,
//                 );

//                 export const Method = HTTP_METHODS.GET;

//                 export type RequestBody = void;

//                 export type Response = Entities.User.Base;
//             }

//             export namespace GetOne {
//                 export const Path = v1('user');

//                 export const ActionName = 'getOne';

//                 export const ActionNameWithEntity = toAction(
//                     ENTITY_NAME.USER,
//                     ActionName,
//                 );

//                 export const Method = HTTP_METHODS.GET;

//                 export type RequestBody = WithTargetId;

//                 export type Response = Entities.User.Base;
//             }

//             export namespace ProfileUpdate {
//                 export const Path = v1('user/profile/update');

//                 export const ActionName = 'profileUpdate';

//                 export const ActionNameWithEntity = toAction(
//                     ENTITY_NAME.USER,
//                     ActionName,
//                 );

//                 export const Method = HTTP_METHODS.POST;

//                 export type RequestBody = T.Simplify<
//                     Partial<T.Override<
//                         Pick<
//                             Entities.User.Base,
//                             'name' | 'settings' | 'extraStatus' | 'avatar'
//                         >,
//                         'avatar',
//                         Entities.File.Encoded | null
//                     >>
//                 >;

//                 export type Response = Entities.User.Base;
//             }

//             export namespace CredentialsUpdate {
//                 export const Path = v1('user/credentials/update');

//                 export const ActionName = 'credentialsUpdate';

//                 export const ActionNameWithEntity = toAction(
//                     ENTITY_NAME.USER,
//                     ActionName,
//                 );

//                 export const Method = HTTP_METHODS.POST;

//                 export type RequestBody = T.Simplify<
//                     Pick<
//                         Entities.User.Base,
//                         'accessCode'
//                     >
//                     & {
//                         password?: string;
//                         newPassword?: string;
//                         newLogin?: string;
//                     }
//                 >;

//                 export type Response = Entities.User.Base;
//             }

//             export namespace Delete {
//                 export const Path = v1('user/delete');

//                 export const ActionName = 'delete';

//                 export const ActionNameWithEntity = toAction(
//                     ENTITY_NAME.USER,
//                     ActionName,
//                 );

//                 export const Method = HTTP_METHODS.POST;

//                 export type RequestBody = void;

//                 export type Response = void;
//             }

//             export namespace Block {
//                 export const Path = v1('user/block');

//                 export const ActionName = 'block';

//                 export const ActionNameWithEntity = toAction(
//                     ENTITY_NAME.USER,
//                     ActionName,
//                 );

//                 export const Method = HTTP_METHODS.POST;

//                 export type RequestBody = WithTargetId;

//                 export type Response = Entities.User.Base;
//             }

//             export namespace Unblock {
//                 export const Path = v1('user/unblock');

//                 export const ActionName = 'unblock';

//                 export const ActionNameWithEntity = toAction(
//                     ENTITY_NAME.USER,
//                     ActionName,
//                 );

//                 export const Method = HTTP_METHODS.POST;

//                 export type RequestBody = WithTargetId;

//                 export type Response = Entities.User.Base;
//             }

//             export namespace RequestAccessCode {
//                 export const Path = v1('user/access-code/request');

//                 export const ActionName = 'requestAccessCode';

//                 export const ActionNameWithEntity = toAction(
//                     ENTITY_NAME.USER,
//                     ActionName,
//                 );

//                 export const Method = HTTP_METHODS.POST;

//                 export type RequestBody = void;

//                 export type Response = void;
//             }

//             export namespace VerifyAccessCode {
//                 export const Path = v1('user/access-code/verify');

//                 export const ActionName = 'verifyAccessCode';

//                 export const ActionNameWithEntity = toAction(
//                     ENTITY_NAME.USER,
//                     ActionName,
//                 );

//                 export const Method = HTTP_METHODS.POST;

//                 export type RequestBody = T.Override<
//                     Pick<Entities.User.Base, 'accessCode'>,
//                     'accessCode',
//                     string
//                 >;

//                 export type Response = void;
//             }

//             export namespace SendFriendRequest {
//                 export const Path = v1('user/friend-request/send');

//                 export const ActionName = 'sendFriendRequest';

//                 export const ActionNameWithEntity = toAction(
//                     ENTITY_NAME.USER,
//                     ActionName,
//                 );

//                 export const Method = HTTP_METHODS.POST;

//                 export type RequestBody = WithTargetId;

//                 export type Response = Entities.User.Base;
//             }

//             export namespace AcceptFriendRequest {
//                 export const Path = v1('user/friend-request/accept');

//                 export const ActionName = 'acceptFriendRequest';

//                 export const ActionNameWithEntity = toAction(
//                     ENTITY_NAME.USER,
//                     ActionName,
//                 );

//                 export const Method = HTTP_METHODS.POST;

//                 export type RequestBody = WithTargetId;

//                 export type Response = Entities.User.Base;
//             }

//             export namespace DeclineFriendRequest {
//                 export const Path = v1('user/friend-request/decline');

//                 export const ActionName = 'declineFriendRequest';

//                 export const ActionNameWithEntity = toAction(
//                     ENTITY_NAME.USER,
//                     ActionName,
//                 );

//                 export const Method = HTTP_METHODS.POST;

//                 export type RequestBody = WithTargetId;

//                 export type Response = Entities.User.Base;
//             }

//             export namespace RevokeFriendRequest {
//                 export const Path = v1('user/friend-request/revoke');

//                 export const ActionName = 'revokeFriendRequest';

//                 export const ActionNameWithEntity = toAction(
//                     ENTITY_NAME.USER,
//                     ActionName,
//                 );

//                 export const Method = HTTP_METHODS.POST;

//                 export type RequestBody = WithTargetId;

//                 export type Response = Entities.User.Base;
//             }

//             export namespace DeleteFriend {
//                 export const Path = v1('user/friend/delete');

//                 export const ActionName = 'deleteFriend';

//                 export const ActionNameWithEntity = toAction(
//                     ENTITY_NAME.USER,
//                     ActionName,
//                 );

//                 export const Method = HTTP_METHODS.POST;

//                 export type RequestBody = WithTargetId;

//                 export type Response = Entities.User.Base;
//             }

//             export namespace HidePrivateChannel {
//                 export const Path = v1('user/hide-conversation');

//                 export const ActionName = 'hidePrivateChannel';

//                 export const ActionNameWithEntity = toAction(
//                     ENTITY_NAME.USER,
//                     ActionName,
//                 );

//                 export const Method = HTTP_METHODS.POST;

//                 export type RequestBody = WithConversationId;

//                 export type Response = Entities.User.Base;
//             }
//         }

//         export namespace Server {
//             export namespace Create {
//                 export const Path = v1('server/create');

//                 export const ActionName = 'create';

//                 export const ActionNameWithEntity = toAction(
//                     ENTITY_NAME.SERVER,
//                     ActionName,
//                 );

//                 export const Method = HTTP_METHODS.POST;

//                 export type RequestBody = T.Simplify<
//                     Pick<Entities.Server.Base, 'name' | 'identifier'>
//                     & Partial<T.Override<
//                         Pick<
//                             Entities.Server.Base,
//                             'avatar'
//                         >,
//                         'avatar',
//                         Entities.File.Encoded
//                     >>
//                 >;

//                 export type Response = Entities.Server.Base;
//             }

//             export namespace GetOne {
//                 export const Path = v1('server');

//                 export const ActionName = 'getOne';

//                 export const ActionNameWithEntity = toAction(
//                     ENTITY_NAME.SERVER,
//                     ActionName,
//                 );

//                 export const Method = HTTP_METHODS.GET;

//                 export type RequestBody = WithServerId;

//                 export type Response = Entities.Server.Base;
//             }

//             export namespace GetByInvitationCode {
//                 export const Path = v1('server');

//                 export const ActionName = 'getByInvitationCode';

//                 export const ActionNameWithEntity = toAction(
//                     ENTITY_NAME.SERVER,
//                     ActionName,
//                 );

//                 export const Method = HTTP_METHODS.GET;

//                 export type RequestBody = {
//                     invitationCode: string;
//                 };

//                 export type Response = Entities.Server.Base;
//             }

//             export namespace Update {
//                 export const Path = v1('server/update');

//                 export const ActionName = 'update';

//                 export const ActionNameWithEntity = toAction(
//                     ENTITY_NAME.SERVER,
//                     ActionName,
//                 );

//                 export const Method = HTTP_METHODS.POST;

//                 export type RequestBody = T.Simplify<
//                     WithServerId
//                     & Partial<Pick<
//                         Entities.Server.Base,
//                         'name'
//                     >
//                     & T.Override<
//                         Pick<Entities.Server.Base, 'avatar'>,
//                         'avatar',
//                         Entities.File.Encoded | null
//                     >>
//                 >;

//                 export type Response = Entities.Server.Base;
//             }

//             export namespace Delete {
//                 export const Path = v1('server/delete');

//                 export const ActionName = 'delete';

//                 export const ActionNameWithEntity = toAction(
//                     ENTITY_NAME.SERVER,
//                     ActionName,
//                 );

//                 export const Method = HTTP_METHODS.POST;

//                 export type RequestBody = WithServerId;

//                 export type Response = void;
//             }

//             export namespace Leave {
//                 export const Path = v1('server/leave');

//                 export const ActionName = 'leave';

//                 export const ActionNameWithEntity = toAction(
//                     ENTITY_NAME.SERVER,
//                     ActionName,
//                 );

//                 export const Method = HTTP_METHODS.POST;

//                 export type RequestBody = WithServerId;

//                 export type Response = void;
//             }

//             export namespace Kick {
//                 export const Path = v1('server/kick');

//                 export const ActionName = 'kick';

//                 export const ActionNameWithEntity = toAction(
//                     ENTITY_NAME.SERVER,
//                     ActionName,
//                 );

//                 export const Method = HTTP_METHODS.POST;

//                 export type RequestBody = WithServerId & WithTargetId;

//                 export type Response = Entities.Server.Base;
//             }

//             export namespace Ban {
//                 export const Path = v1('server/ban');

//                 export const ActionName = 'ban';

//                 export const ActionNameWithEntity = toAction(
//                     ENTITY_NAME.SERVER,
//                     ActionName,
//                 );

//                 export const Method = HTTP_METHODS.POST;

//                 export type RequestBody = T.Simplify<
//                     WithServerId
//                     & WithTargetId
//                 >;

//                 export type Response = Entities.Server.Base;
//             }

//             export namespace Unban {
//                 export const Path = v1('server/unban');

//                 export const ActionName = 'unban';

//                 export const ActionNameWithEntity = toAction(
//                     ENTITY_NAME.SERVER,
//                     ActionName,
//                 );

//                 export const Method = HTTP_METHODS.POST;

//                 export type RequestBody = WithTargetId & WithServerId;

//                 export type Response = Entities.Server.Base;
//             }

//             export namespace CreateInvitation {
//                 export const Path = v1('server/invitation/create');

//                 export const ActionName = 'createInvitation';

//                 export const ActionNameWithEntity = toAction(
//                     ENTITY_NAME.SERVER,
//                     ActionName,
//                 );

//                 export const Method = HTTP_METHODS.POST;

//                 export type RequestBody = T.Simplify<WithServerId & Pick<
//                     Entities.Server.Base['invitations'][number],
//                     'expiresAt'
//                 >>;

//                 export type Response = Entities.Server.Base;
//             }

//             export namespace AcceptInvitation {
//                 export const Path = v1('server/invitation/accept');

//                 export const ActionName = 'acceptInvitation';

//                 export const ActionNameWithEntity = toAction(
//                     ENTITY_NAME.SERVER,
//                     ActionName,
//                 );

//                 export const Method = HTTP_METHODS.POST;

//                 export type RequestBody = T.Simplify<Pick<
//                     Entities.Server.Base['invitations'][number],
//                     'code'
//                 >>;

//                 export type Response = Entities.Server.Base;
//             }

//             export namespace DeleteInvitation {
//                 export const Path = v1('server/invitation/delete');

//                 export const ActionName = 'deleteInvitation';

//                 export const ActionNameWithEntity = toAction(
//                     ENTITY_NAME.SERVER,
//                     ActionName,
//                 );

//                 export const Method = HTTP_METHODS.POST;

//                 export type RequestBody = T.Simplify<WithServerId & Pick<
//                     Entities.Server.Base['invitations'][number],
//                     'code'
//                 >>;

//                 export type Response = Entities.Server.Base;
//             }
//         }

//         export namespace Channel {
//             export namespace Create {
//                 export const Path = v1('channel/create');

//                 export const ActionName = 'create';

//                 export const ActionNameWithEntity = toAction(
//                     ENTITY_NAME.SERVER,
//                     ActionName,
//                 );

//                 export const Method = HTTP_METHODS.POST;

//                 export type RequestBody = T.Simplify<
//                     WithServerId
//                     & Pick<
//                         Entities.Channel.Base,
//                         'name' | 'roleWhitelist'
//                     >
//                     & {
//                         type: 'Text' | 'Voice';
//                     }
//                 >;

//                 export type Response = Entities.Channel.Base;
//             }

//             export namespace GetOne {
//                 export const Path = v1('channel');

//                 export const ActionName = 'getOne';

//                 export const ActionNameWithEntity = toAction(
//                     ENTITY_NAME.SERVER,
//                     ActionName,
//                 );

//                 export const Method = HTTP_METHODS.GET;

//                 export type RequestBody = WithServerId & WithChannelId;

//                 export type Response = Entities.Channel.Base;
//             }

//             export namespace Update {
//                 export const Path = v1('channel/update');

//                 export const ActionName = 'update';

//                 export const ActionNameWithEntity = toAction(
//                     ENTITY_NAME.SERVER,
//                     ActionName,
//                 );

//                 export const Method = HTTP_METHODS.POST;

//                 export type RequestBody = T.Simplify<
//                     WithServerId
//                     & WithChannelId
//                     & Partial<Pick<
//                         Entities.Channel.Base,
//                         'name' | 'roleWhitelist'
//                     >>
//                 >;

//                 export type Response = Entities.Channel.Base;
//             }

//             export namespace Delete {
//                 export const Path = v1('channel/delete');

//                 export const ActionName = 'delete';

//                 export const ActionNameWithEntity = toAction(
//                     ENTITY_NAME.SERVER,
//                     ActionName,
//                 );

//                 export const Method = HTTP_METHODS.POST;

//                 export type RequestBody = WithServerId & WithChannelId;

//                 export type Response = void;
//             }
//         }

//         export namespace Role {
//             export namespace Create {
//                 export const Path = v1('role/create');

//                 export const ActionName = 'create';

//                 export const ActionNameWithEntity = toAction(
//                     ENTITY_NAME.ROLE,
//                     ActionName,
//                 );

//                 export const Method = HTTP_METHODS.POST;

//                 export type RequestBody = WithServerId & Pick<
//                     Entities.Role.Base,
//                     'name'
//                 >;

//                 export type Response = Entities.Role.Base;
//             }

//             export namespace GetOne {
//                 export const Path = v1('role');

//                 export const ActionName = 'getOne';

//                 export const ActionNameWithEntity = toAction(
//                     ENTITY_NAME.ROLE,
//                     ActionName,
//                 );

//                 export const Method = HTTP_METHODS.GET;

//                 export type RequestBody = WithServerId & WithRoleId;

//                 export type Response = Entities.Role.Base;
//             }

//             export namespace Update {
//                 export const Path = v1('role/update');

//                 export const ActionName = 'update';

//                 export const ActionNameWithEntity = toAction(
//                     ENTITY_NAME.ROLE,
//                     ActionName,
//                 );

//                 export const Method = HTTP_METHODS.POST;

//                 export type RequestBody = T.Simplify<
//                     WithServerId
//                     & WithRoleId
//                     & Partial<Pick<
//                         Entities.Role.Base,
//                         'color' | 'isDefault' | 'name' | 'permissions'
//                     >>
//                     & Partial<T.Override<
//                         Pick<Entities.Role.Base, 'avatar'>,
//                         'avatar',
//                         Entities.File.Encoded | null
//                     >>
//                 >;

//                 export type Response = Entities.Role.Base;
//             }

//             export namespace Delete {
//                 export const Path = v1('role/delete');

//                 export const ActionName = 'delete';

//                 export const ActionNameWithEntity = toAction(
//                     ENTITY_NAME.ROLE,
//                     ActionName,
//                 );

//                 export const Method = HTTP_METHODS.POST;

//                 export type RequestBody = WithServerId & WithRoleId;

//                 export type Response = void;
//             }

//             export namespace AddMember {
//                 export const Path = v1('role/member/add');

//                 export const ActionName = 'addMember';

//                 export const ActionNameWithEntity = toAction(
//                     ENTITY_NAME.ROLE,
//                     ActionName,
//                 );

//                 export const Method = HTTP_METHODS.POST;

//                 export type RequestBody = (
//                     WithServerId
//                     & WithRoleId
//                     & WithTargetId
//                 );

//                 export type Response = Entities.Role.Base;
//             }

//             export namespace RemoveMember {
//                 export const Path = v1('role/member/remove');

//                 export const ActionName = 'removeMember';

//                 export const ActionNameWithEntity = toAction(
//                     ENTITY_NAME.ROLE,
//                     ActionName,
//                 );

//                 export const Method = HTTP_METHODS.POST;

//                 export type RequestBody = (
//                     WithServerId
//                     & WithRoleId
//                     & WithTargetId
//                 );

//                 export type Response = Entities.Role.Base;
//             }
//         }

//         export namespace Conversation {
//             export namespace Create {
//                 export const Path = v1('conversation/create');

//                 export const ActionName = 'create';

//                 export const ActionNameWithEntity = toAction(
//                     ENTITY_NAME.CONVERSATION,
//                     ActionName,
//                 );

//                 export const Method = HTTP_METHODS.POST;

//                 export type RequestBody = WithTargetId;

//                 export type Response = Entities.Conversation.Base;
//             }

//             export namespace GetOne {
//                 export const Path = v1('conversation');

//                 export const ActionName = 'getOne';

//                 export const ActionNameWithEntity = toAction(
//                     ENTITY_NAME.CONVERSATION,
//                     ActionName,
//                 );

//                 export const Method = HTTP_METHODS.GET;

//                 export type RequestBody = WithConversationId;

//                 export type Response = Entities.Conversation.Base;
//             }
//         }

//         export namespace Message {
//             export namespace Create {
//                 export const Path = v1('message/create');

//                 export const ActionName = 'create';

//                 export const ActionNameWithEntity = toAction(
//                     ENTITY_NAME.MESSAGE,
//                     ActionName,
//                 );

//                 export const Method = HTTP_METHODS.POST;

//                 export type RequestBody = T.Simplify<
//                     WithTextChatId
//                     & T.Override<
//                         Pick<Entities.Message.Base, 'attachments' | 'content'>,
//                         'attachments',
//                         Entities.File.Encoded[]
//                     >
//                 >;

//                 export type Response = Entities.Message.Base;
//             }

//             export namespace GetOne {
//                 export const Path = v1('message');

//                 export const ActionName = 'getOne';

//                 export const ActionNameWithEntity = toAction(
//                     ENTITY_NAME.MESSAGE,
//                     ActionName,
//                 );

//                 export const Method = HTTP_METHODS.GET;

//                 export type RequestBody = WithMessageId;

//                 export type Response = Entities.Message.Base;
//             }

//             export namespace Update {
//                 export const Path = v1('message/update');

//                 export const ActionName = 'update';

//                 export const ActionNameWithEntity = toAction(
//                     ENTITY_NAME.MESSAGE,
//                     ActionName,
//                 );

//                 export const Method = HTTP_METHODS.POST;

//                 export type RequestBody = T.Simplify<WithMessageId & Pick<
//                     Entities.Message.Base,
//                     'content'
//                 >>;

//                 export type Response = Entities.Message.Base;
//             }

//             export namespace Delete {
//                 export const Path = v1('message/delete');

//                 export const ActionName = 'delete';

//                 export const ActionNameWithEntity = toAction(
//                     ENTITY_NAME.MESSAGE,
//                     ActionName,
//                 );

//                 export const Method = HTTP_METHODS.POST;

//                 export type RequestBody = WithMessageId;

//                 export type Response = Entities.Message.Base;
//             }

//             export namespace Restore {
//                 export const Path = v1('message/restore');

//                 export const ActionName = 'restore';

//                 export const ActionNameWithEntity = toAction(
//                     ENTITY_NAME.MESSAGE,
//                     ActionName,
//                 );

//                 export const Method = HTTP_METHODS.POST;

//                 export type RequestBody = WithMessageId;

//                 export type Response = Entities.Message.Base;
//             }

//             export namespace DeleteAttachment {
//                 export const Path = v1('message/attachment/delete');

//                 export const ActionName = 'deleteAttachment';

//                 export const ActionNameWithEntity = toAction(
//                     ENTITY_NAME.MESSAGE,
//                     ActionName,
//                 );

//                 export const Method = HTTP_METHODS.POST;

//                 export type RequestBody = WithMessageId & WithFileId;

//                 export type Response = Entities.Message.Base;
//             }
//         }

//         export namespace File {
//             export namespace Read {
//                 export const Path = v1('file/read');

//                 export const ActionName = 'read';

//                 export const ActionNameWithEntity = toAction(
//                     ENTITY_NAME.FILE,
//                     ActionName,
//                 );

//                 export const Method = HTTP_METHODS.GET;

//                 export type RequestBody = WithFileId;

//                 export type Response = void;
//             }

//             export namespace Download {
//                 export const Path = v1('file/download');

//                 export const ActionName = 'download';

//                 export const ActionNameWithEntity = toAction(
//                     ENTITY_NAME.FILE,
//                     ActionName,
//                 );

//                 export const Method = HTTP_METHODS.GET;

//                 export type RequestBody = WithFileId;

//                 export type Response = void;
//             }
//         }

//         export namespace TextChat {
//             export namespace GetOne {
//                 export const Path = v1('text-chat');

//                 export const ActionName = 'getOne';

//                 export const ActionNameWithEntity = toAction(
//                     ENTITY_NAME.TEXT_CHAT,
//                     ActionName,
//                 );

//                 export const Method = HTTP_METHODS.POST;

//                 export type RequestBody = WithTextChatId;

//                 export type Response = Entities.TextChat.Base;
//             }
//         }
//     }
// }