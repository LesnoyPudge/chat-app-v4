/* eslint-disable @typescript-eslint/no-explicit-any */

import { Endpoints } from '@fakeShared';
import { logger } from '@utils';
import { delay as _delay, http, HttpResponse } from 'msw';
import { setupWorker } from 'msw/browser';
import { FakeDBB } from './FakeDB';
import { Dummies } from './Dummies';
import { STATUS_CODE } from '@lesnoypudge/utils';
import { env } from '@vars';
import { token } from './token';
import { v4 as uuid } from 'uuid';


// import E_Channel = Endpoints.V1.Channel;
// import E_Conversation = Endpoints.V1.Conversation;
// import E_File = Endpoints.V1.File;
// import E_Message = Endpoints.V1.Message;
// import E_Role = Endpoints.V1.Role;
import E_Server = Endpoints.V1.Server;
// import E_TextChat = Endpoints.V1.TextChat;
import E_User = Endpoints.V1.User;


const db = new FakeDBB();
const res = HttpResponse;

const delay = () => _delay(1_500);

const apiError = {
    badRequest: () => new res(null, {
        status: STATUS_CODE.BAD_REQUEST,
    }),
};

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
        http[E_User.Login.Method]<
            any,
            E_User.Login.RequestBody
        >(
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

                if (!user) return apiError.badRequest();

                return res.json(user);
            },
        ),

        http[E_User.Registration.Method]<
            any,
            E_User.Registration.RequestBody
        >(
            `${env._PUBLIC_SERVER_URL}${E_User.Registration.Path}`,
            async ({ request }) => {
                await delay();
                const body = await request.json();

                const isExist = db.getOne('user', (item) => {
                    return item.login === body.login;
                });

                if (isExist) return apiError.badRequest();

                const id = uuid();

                const {
                    accessToken,
                    refreshToken,
                } = token.generateTokens({
                    id,
                    password: body.password,
                });

                const user = db.create('user', Dummies.user({
                    ...body,
                    id,
                    accessToken,
                    refreshToken,
                }));

                return res.json(user);
            },
        ),

        http[E_User.Refresh.Method]<
            any,
            E_User.Refresh.RequestBody
        >(
            `${env._PUBLIC_SERVER_URL}${E_User.Refresh.Path}`,
            async ({ request }) => {
                await delay();
                const body = await request.json();

                const user = db.getOne('user', (item) => {
                    return item.refreshToken === body.refreshToken;
                });

                if (!user) return apiError.badRequest();

                const {
                    accessToken,
                } = token.generateTokens({
                    id: user.id,
                    password: user.password,
                });

                const updatedUser = db.update('user', user.id, (item) => ({
                    ...item,
                    accessToken,
                }));

                return res.json(updatedUser);
            },
        ),

        http[E_Server.GetOneByInvitationCode.Method]<
            any,
            E_Server.GetOneByInvitationCode.RequestBody
        >(
            `${env._PUBLIC_SERVER_URL}${E_Server.GetOneByInvitationCode.Path}`,
            async ({ request }) => {
                await delay();
                const body = await request.json();

                const server = db.getOne('server', (item) => {
                    return item.invitations.some((inv) => {
                        return inv.code === body.invitationCode;
                    });
                });

                if (!server) return apiError.badRequest();

                return res.json(server);
            },
        ),
    ];
}

export const fakeServer = new FakeServer();