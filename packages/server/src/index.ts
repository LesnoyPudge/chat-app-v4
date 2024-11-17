import express from 'express';
import { env } from '@constants';
import { setupI18n } from '@i18n';
import { createServer } from './server';
import { createSocketServer } from './socket';
import { createDB } from './database';
import { App } from '@types';
import { Prisma, PrismaClient } from '@prisma/client';
import { UserController } from './controllers/UserController';
import { uuidv4 } from '@libs';



export const db = new PrismaClient({
    transactionOptions: {
        isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
    },
});

const uc = await db.user.count();
const sc = await db.server.count();

await db.$transaction(async (dbt) => {
    if (sc) {
        console.log({ sc });
        await dbt.server.deleteMany();
    }
    if (uc) {
        console.log({ uc });
        await dbt.user.deleteMany();
    }
});

const u1ID = uuidv4();
const s1ID = uuidv4();

const u1 = await db.user.create({
    data: {
        id: u1ID,
        name: 'clown1',
    },
});

const s1 = await db.server.create({
    data: {
        id: s1ID,
        name: 's1',
        ownerId: u1ID,
        members: {
            connect: u1,
        },
    },
    include: {
        members: {
            select: {
                id: true,
            },
        },
    },
});

const u2 = await db.user.update({
    where: {
        id: u1ID,
    },
    data: {
        ownedServers: {
            connect: {
                id: s1ID,
            },
        },
        servers: {
            connect: {
                id: s1ID,
            },
        },
    },
    include: {
        servers: {
            select: {
                id: true,
            },
        },
    },
});


console.log(JSON.stringify({
    user: u2,
    server: s1,
}, null, 4));

db.user.fields;
db.server.fields;

type User = {
    id: string;
    servers: string[];
};

type Server = {
    id: string;
    ownerId: string;
    members: string[];
};


const main = async () => {
    // const users = await new UserController({ db }).getUsers();
    // console.log(users);

    const app = express() as App;
    const { server, setupServer } = createServer(app);

    await setupI18n(app);
    console.log('I18n is ready');

    const socketServer = createSocketServer(server);
    console.log('Socket server is ready');

    // const db = createDB();
    // console.log('Database is ready');

    await setupServer();
    console.log(`Server is ready at: ${env._PUBLIC_SERVER_URL}`);
};

await main();