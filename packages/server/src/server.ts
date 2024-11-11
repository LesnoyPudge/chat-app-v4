import express from 'express';
import http from 'node:http';
import { env } from '@constants';
import mongoose from 'mongoose';
import cache from 'node-cache';

const zxc = new cache({});


const app = express();
const server = http.createServer({
    // key: fs.readFileSync(`${import.meta.dirname}/https/server.key`),
    // cert: fs.readFileSync(`${import.meta.dirname}/https/server.crt`),
}, app);

app.get('/', (req, res, next) => {
    res.send('hello');
});

const initServer = () => {
    return new Promise<void>((resolve, reject) => {
        server.listen(
            Number.parseInt(env._PUBLIC_SERVER_PORT),
            env._PUBLIC_URL_HOSTNAME,
        );

        server.on('listening', resolve);

        server.on('error', reject);
    });
};
console.log('huh?');
const main = async () => {
    await mongoose.connect(env._DB_CONNECTION_URL);
    await initServer();
    console.log(`Server is started at ${env._PUBLIC_SERVER_URL}`);
};

await main();



// const app = require('express')();
// const server = require('node:http').createServer(app);
// const io = require('socket.io')(server);
// io.on('connection', () => { /* … */ });
// server.listen(3000);