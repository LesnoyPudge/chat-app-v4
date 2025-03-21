import { socket } from '@/fakeSocket';
import { ReduxToolkit } from '@/libs';



export const socketActions = {
    addSocketData: ReduxToolkit.createAction<
        socket.AddedData
    >('addSocketData'),
    removeSocketData: ReduxToolkit.createAction<
        socket.RemovedData
    >('removeSocketData'),
};