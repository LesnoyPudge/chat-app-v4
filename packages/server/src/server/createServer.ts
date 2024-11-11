import { Express } from 'express';
import http from 'node:http';
import https from 'node:https';
import fs from 'node:fs';
import path from 'node:path';
import { env, isDev } from '@constants';
import { Server } from '@types';



const keyPath = path.join(import.meta.dirname, './https/server.key');
const certPath = path.join(import.meta.dirname, './https/server.crt');

export const createServer = (app: Express): Promise<Server> => {
    return new Promise((resolve, reject) => {
        const server = (
            isDev
                ? http.createServer(app)
                : https.createServer({
                    key: fs.readFileSync(keyPath),
                    cert: fs.readFileSync(certPath),
                }, app)
        );

        server.listen(
            Number.parseInt(env._PUBLIC_SERVER_PORT),
            env._PUBLIC_URL_HOSTNAME,
        );

        server.on('listening', () => {
            resolve(server);
        });

        server.on('error', reject);
    });
};