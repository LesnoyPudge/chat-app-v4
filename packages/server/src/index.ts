import express from 'express';
import { env } from '@constants';
import { setupMongoDB } from './databases';
import { setupI18n, t } from '@i18n';
import { createServer } from './server';



const main = async () => {
    const app = express();
    const server = await createServer(app);
    console.log(`Server is started at ${env._PUBLIC_SERVER_URL}`);

    await setupI18n(app);
    console.log('I18n is ready');

    console.log(t('hi'));
    // await setupMongoDB();
    // console.log('MongoDB is ready');
};

await main();