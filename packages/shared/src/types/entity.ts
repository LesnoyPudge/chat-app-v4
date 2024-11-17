// import type { T } from '@lesnoypudge/types-utils-base/namespace';
// import type {
//     User as _User,
// } from '../../../server/node_modules/@prisma/client';


// type TagId<_Name extends string> = T.Tagged<string, _Name>;



// export namespace Entity {
//     export namespace User {
//         export type Base = {};

//         export type Credentials = {
//             password: string;
//             refreshToken: string;
//             accessCode: {
//                 code: string;
//                 expiresAt: Timestamp;
//             };
//         };

//         type Settings = {
//             settings: {
//                 theme: 'auto' | 'dark' | 'light';
//                 fontSize: 12 | 14 | 16 | 18 | 20;
//                 messageGroupSpacing: 16 | 20;
//                 messageDisplayMode: 'cozy' | 'compact';
//             };
//         };

//         export type Status = 'online' | 'offline';

//         export type WithStatus = {
//             status: Status;
//         };

//         export type ExtraStatus = 'default' | 'afk' | 'dnd' | 'invisible';

//         export type Default = {
//             id: Id;
//             login: string;
//             username: string;
//             avatarId: Id;
//             email: string | null;
//             extraStatus: ExtraStatus;
//             isActivated: boolean;
//             friends: Id[];
//             blocked: Id[];
//             channels: Id[];
//             privateChannels: {
//                 id: Id;
//                 hidden: boolean;
//             }[];
//             friendRequests: {
//                 incoming: {
//                     from: Id;
//                     createdAt: Timestamp;
//                 }[];
//                 outgoing: {
//                     to: Id;
//                     createdAt: Timestamp;
//                 }[];
//             };
//             isDeleted: boolean;
//             createdAt: Timestamp;
//         } & Credentials & Settings;

//         export type WithoutCredentials = Prettify<
//             StrictOmit<User.Default, keyof Credentials> &
//             WithStatus
//         >;

//         export type Preview = Pick<
//             User.WithoutCredentials,
//             'id' | 'avatarId' | 'login' | 'extraStatus' |
//             'username' | 'isDeleted' | 'blocked' | 'status'
//         >;

//         export type Token = Pick<
//             User.Default,
//             'id' | 'password' | 'email'
//         >;
//     }

//     export namespace Channel {
//         export type Default = {
//             id: Id;
//             identifier: string;
//             avatar: Id | null;
//             name: string;
//             owner: Id;
//             isPrivate: boolean;
//             members: Id[];
//             rooms: Id[];
//             roles: Id[];
//             banned: {
//                 user: Id;
//                 reason: string | null;
//             }[];
//             invitations: {
//                 creator: Id;
//                 code: string;
//                 expiresAt: Timestamp | null;
//                 createdAt: Timestamp;
//             }[];
//             createdAt: Timestamp;
//         };
//     }

//     export namespace Room {
//         export type Default = {
//             id: Id;
//             name: string;
//             channel: Id;
//             isPrivate: boolean;
//             chat: Id;
//             conversation: Id;
//             whiteList: {
//                 users: Id[];
//                 roles: Id[];
//             };
//             type: 'voice' | 'text';
//             createdAt: Timestamp;
//         };
//     }

//     export namespace Message {
//         export type Default = {
//             id: Id;
//             chat: Id;
//             user: Id;
//             content: string;
//             attachments: File.Attachment[];
//             isChanged: boolean;
//             isDeleted: boolean;
//             createdAt: Timestamp;
//             updatedAt: Timestamp;
//         };
//     }

//     export namespace Role {
//         export type Default = {
//             id: Id;
//             name: string;
//             channel: Id;
//             users: Id[];
//             isDefault: boolean;
//             color: string;
//             image: Id | null;
//             order: number;
//             permissions: {
//                 channelControl: boolean;
//                 roomControl: boolean;
//                 createInvitation: boolean;
//                 kickMember: boolean;
//                 banMember: boolean;
//                 isAdministrator: boolean;
//             };
//             createdAt: Timestamp;
//         };
//     }

//     export namespace File {
//         export type Default = {
//             id: Id;
//             name: string;
//             size: number;
//             type: string;
//             base64: string;
//             isDeletable: boolean;
//             createdAt: Timestamp;
//         };

//         export type Encoded = Pick<
//             File.Default,
//             'name' | 'size' | 'type' | 'base64'
//         >;

//         export type Attachment = Pick<
//             File.Default,
//             'id' | 'name' | 'type' | 'size'
//         >;
//     }

//     export namespace PrivateChannel {
//         export type Default = {
//             id: Id;
//             members: [Id, Id];
//             chat: Id;
//             conversation: Id;
//             createdAt: Timestamp;
//         };
//     }

//     export namespace Chat {
//         export type Default = {
//             id: Id;
//             ownerId: Id;
//             owner: typeof MODEL_NAMES.PRIVATE_CHANNEL | typeof MODEL_NAMES.ROOM;
//             messages: Id[];
//         };
//     }

//     export namespace Conversation {
//         export type Default = {
//             id: Id;
//             ownerId: Id;
//             owner: typeof MODEL_NAMES.PRIVATE_CHANNEL | typeof MODEL_NAMES.ROOM;
//             members: Map<UserId, PeerId>;
//             startTimestamp: Timestamp;
//         };
//     }
// }