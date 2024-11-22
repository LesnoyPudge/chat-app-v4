import { env } from '@constants';
import { HTTP_METHOD } from '@lesnoypudge/utils';
import { Server } from '@types';
import { Server as SocketServer } from 'socket.io';



export const createSocketServer = (server: Server): SocketServer => {
    const socketServer = new SocketServer(server, {
        cors: {
            credentials: true,
            origin: env._PUBLIC_CLIENT_URL,
            methods: [HTTP_METHOD.POST, HTTP_METHOD.GET],
        },
        allowRequest: (req, next) => {
            console.log('received socket request');
            next(null, true);
            // (socket, next) => {
            //     const auth = socket.handshake.auth as Partial<SocketAuth>;
            //     // console.log('get socket message', auth);

            //     if (Number(CUSTOM_CLIENT_ONLY)) return next();

            //     if (!auth.accessToken) return next(ApiError.unauthorized());

            //     const tokenData = token.validateAccessToken(auth.accessToken);
            //     if (!tokenData) return next(ApiError.unauthorized());

            //     socket.data = {
            //         // id: '123',
            //         // email: null,
            //         // password: 'qwe',
            //         // accessToken: 'qwezxc',
            //         ...tokenData,
            //         accessToken: auth.accessToken,
            //     };

            //     next();
            // }
        },
    });

    return socketServer;
};