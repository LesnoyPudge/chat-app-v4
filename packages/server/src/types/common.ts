import type http from 'node:http';
import type https from 'node:https';



export type Server = (
    ReturnType<typeof http.createServer>
    | ReturnType<typeof https.createServer>
);