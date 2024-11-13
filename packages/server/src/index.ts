import express from 'express';
import { env } from '@constants';
import { setupMongoDB } from './databases';
import { setupI18n } from '@i18n';
import { createServer } from './server';
import { createSocketServer } from './socket';
import { Prisma, PrismaClient } from '@prisma/client';



// const pool = new pg.Pool({
//     connectionString: env.DATABASE_URL,
// });
// const adapter = new PrismaPg(pool);
// const prisma = new PrismaClient({ adapter });
const prisma = new PrismaClient({
    transactionOptions: {
        isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
    },
});

// const prisma = new PrismaClient({
//     // datasourceUrl: env.DATABASE_URL
// });


// const user = await prisma.user.create({
//     data: {
//         name: 'Bob',
//     },
// });

const user = await prisma.user.findMany();

// const newUser = await prisma.$transaction();

console.log(user);

//      ^?
// const allUsers = await prisma.user.findMany();
// console.log(allUsers);


console.log(env.DATABASE_URL);

const main = async () => {
    const app = express();
    const { server, setupServer } = createServer(app);

    await setupI18n(app);
    console.log('I18n is ready');

    const socketServer = createSocketServer(server);
    console.log('Socket server is ready');

    // await setupMongoDB();
    // console.log('MongoDB is ready');

    await setupServer();
    console.log(`Server is ready at: ${env._PUBLIC_SERVER_URL}`);
};

await main();