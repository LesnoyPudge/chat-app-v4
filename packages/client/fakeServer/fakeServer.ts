/* eslint-disable @typescript-eslint/no-explicit-any */

import { Endpoints } from '@fakeShared';
import { logger } from '@utils';
import { delay, http, HttpResponse } from 'msw';
import { setupWorker } from 'msw/browser';
import { FakeDBB } from './FakeDB';
import { Dummies } from './Dummies';
import { STATUS_CODE } from '@lesnoypudge/utils';
import { env } from '@vars';
import E_Channel = Endpoints.V1.Channel;
import E_Conversation = Endpoints.V1.Conversation;
import E_File = Endpoints.V1.File;
import E_Message = Endpoints.V1.Message;
import E_Role = Endpoints.V1.Role;
import E_Server = Endpoints.V1.Server;
import E_TextChat = Endpoints.V1.TextChat;
import E_User = Endpoints.V1.User;


const db = new FakeDBB();
const dummies = new Dummies();
const res = HttpResponse;

class FakeServer {
    async init() {
        const worker = setupWorker(...this.getRoutes());

        await worker.start({
            onUnhandledRequest: (request, print) => {
                if (
                    request.url.includes('cdn.com')
                    || !request.url.includes('/api')
                ) return;

                print.warning();
            },
        });

        logger.log('FakeServer initialized');
    }

    getRoutes = () => [
        http[E_User.Login.Method]<any, E_User.Login.RequestBody>(
            `${env._PUBLIC_SERVER_URL}${E_User.Login.Path}`,
            async ({ request }) => {
                await delay();
                const body = await request.json();

                const user = db.getOne('user', (item) => {
                    return (
                        item.login === body.login
                        && item.password === body.password
                    );
                });

                if (!user) return new res(null, {
                    status: STATUS_CODE.BAD_REQUEST,
                });

                return res.json(user);
            },
        ),

        http[E_User.Registration.Method]<any, E_User.Registration.RequestBody>(
            `${env._PUBLIC_SERVER_URL}${E_User.Registration.Path}`,
            async ({ request }) => {
                await delay();
                const body = await request.json();

                const isExist = db.getOne('user', (item) => {
                    return item.login === body.login;
                });

                if (isExist) return new res(null, {
                    status: STATUS_CODE.BAD_REQUEST,
                    statusText: 'd4 bad',
                });

                const user = db.create('user', dummies.user(body));

                return res.json(user);
            },
        ),
    ];
}

export const fakeServer = new FakeServer();