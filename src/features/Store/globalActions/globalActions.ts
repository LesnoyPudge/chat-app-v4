import { socket } from '@/fakeSocket';
import { ReduxToolkit } from '@/libs';



export const globalActions = {
    addSocketData: ReduxToolkit.createAction<
        socket.AddedData
    >('addSocketData'),

    removeSocketData: ReduxToolkit.createAction<
        socket.RemovedData
    >('removeSocketData'),

    softReset: ReduxToolkit.createAction('softReset'),
};