import { U } from '@root';

export const ENTITY_NAMES = {
    USER: 'User',
    CHANNEL: 'Channel',
    ROOM: 'Room',
    PRIVATE_CHANNEL: 'PrivateChannel',
    FILE: 'File',
    MESSAGE: 'Message',
    ROLE: 'Role',
    CHAT: 'Chat',
    VOICE_CHAT: 'VoiceChat',
    REACTIONS: 'Reactions',
} as const;

export const MODEL_NAMES = U.omit(ENTITY_NAMES, 'VOICE_CHAT');

export const SUBSCRIBABLE_ENTITY_NAMES = U.omit(ENTITY_NAMES, 'FILE');

export const SOCKET_CLIENT_EVENT_NAMES = {
    SUBSCRIBE: 'subscribe',
    UNSUBSCRIBE: 'unsubscribe',
} as const;

export const SOCKET_SERVER_EVENT_NAMES = {
    DATA: 'data',
    ERROR: 'error',
    DELETE: 'delete',
} as const;

export const HTTP_STATUS_CODES = {
    OK: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
} as const;

export const METHODS = {
    POST: 'post',
    GET: 'get',
} as const;