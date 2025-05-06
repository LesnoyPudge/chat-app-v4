// import { pick } from '@lesnoypudge/utils';



export const ENTITY_NAME = {
    USER: 'User',
    MESSAGE: 'Message',
    TEXT_CHAT: 'TextChat',
    CONVERSATION: 'Conversation',
    ROLE: 'Role',
    CHANNEL: 'Channel',
    SERVER: 'Server',
    FILE: 'File',
} as const;

// export const SUBSCRIBABLE_ENTITY_NAME = pick(
//     ENTITY_NAME,
//     'CHANNEL',
//     'CONVERSATION',
//     'MESSAGE',
//     'ROLE',
//     'SERVER',
//     'TEXT_CHAT',
//     'USER',
//     'VOICE_CHAT',
// );