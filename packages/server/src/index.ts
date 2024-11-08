import express from 'express';
import { env } from './utils';

// const app = require('express')();
// const server = require('node:http').createServer(app);
// const io = require('socket.io')(server);
// io.on('connection', () => { /* … */ });
// server.listen(3000);

const qwe = {
    data: 'qwe',
    some: 5,
    wow: 'zxc',
};

const zxc = Object.keys<typeof qwe>(qwe);
//    ^?


console.log('in server!! yup', process.env);