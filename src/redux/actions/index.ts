import { socket } from '@/fakeSocket';
import { createAction } from '@reduxjs/toolkit';



export const socketActions = {
    addSocketData: createAction<socket.AddedData>('addSocketData'),
    removeSocketData: createAction<socket.RemovedData>('removeSocketData'),
};