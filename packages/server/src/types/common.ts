import type { PrismaClient } from '@prisma/client';
import type http from 'node:http';
import type https from 'node:https';
import type {
    Server as _SocketServer,
    DefaultEventsMap,
} from 'socket.io';
import type { Express } from 'express';



export type Server = (
    ReturnType<typeof http.createServer>
    | ReturnType<typeof https.createServer>
);

export type SocketServer = _SocketServer<
    DefaultEventsMap,
    DefaultEventsMap
>;

export type App = Express;

export type DB = PrismaClient;