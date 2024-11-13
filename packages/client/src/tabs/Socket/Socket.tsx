import { FC, useSyncExternalStore } from 'react';
import { Block } from '../../components/Block';
import socketIO from 'socket.io-client';
import { env } from '@constants';



const socketClient = socketIO(env._PUBLIC_WS_SERVER, {
    withCredentials: true,
    auth: (cb) => {
        cb({ accessToken: 'localStorage.token' });
    },
    autoConnect: false,
});

socketClient.onAny((args) => {
    console.log(args);
});

export const Socket: FC = () => {
    const connected = useSyncExternalStore(
        (fn) => () => {
            socketClient.on('connect', fn);
            socketClient.on('disconnect', fn);
        },
        () => socketClient.connected,
    );

    return (
        <>
            <Block
                title={`Socket state: ${connected}`}
                buttonText={connected ? 'disconnect' : 'connect'}
                buttonAction={() => (
                    connected
                        ? socketClient.disconnect()
                        : socketClient.connect()
                )}
            />
        </>
    );
};