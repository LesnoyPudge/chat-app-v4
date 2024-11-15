import express from 'express';
import { env } from '@constants';
import { setupI18n } from '@i18n';
import { createServer } from './server';
import { createSocketServer } from './socket';
import { createDB } from './database';
import { App } from '@types';
import { Prisma, PrismaClient } from '@prisma/client';
import { UserController } from './controllers/UserController';



export const db = new PrismaClient({
    transactionOptions: {
        isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
    },
});

const main = async () => {
    const users = await new UserController({ db }).getUsers();
    console.log(users);

    // const app = express() as App;
    // const { server, setupServer } = createServer(app);

    // await setupI18n(app);
    // console.log('I18n is ready');

    // const socketServer = createSocketServer(server);
    // console.log('Socket server is ready');

    // const db = createDB();
    // console.log('Database is ready');

    // await setupServer();
    // console.log(`Server is ready at: ${env._PUBLIC_SERVER_URL}`);
};

await main();