import { T } from '@lesnoypudge/types-utils-base/namespace';
import { Slices } from '@redux/store';
import { EntityState } from '@reduxjs/toolkit';



class FakeSocket {
    isConnected = false;

    addDataCallback: socket.AddDataCallback | null = null;

    removeDataCallback: socket.RemoveDataCallback | null = null;

    connect() {
        this.isConnected = true;
    }

    disconnect() {
        this.isConnected = false;
    }

    unsubscribe(listenerId: string) {}

    subscribe(
        listenerId: string,
        entityName: socket.Names,
        memoizedIds: string[],
    ) {
        return () => this.unsubscribe(listenerId);
    }

    broadcast(
        type: 'add' | 'remove',
        data: socket.AddedData | socket.RemovedData,
    ) {
        //
    }

    addData(data: socket.AddedData) {
        this.broadcast('add', data);
    }

    removeData(data: socket.RemovedData) {
        this.broadcast('remove', data);
    }

    onAddData(fn: socket.AddDataCallback) {
        this.addDataCallback = fn;
    }

    removeOnAddData() {
        this.addDataCallback = null;
    }

    onRemoveData(fn: socket.RemoveDataCallback) {
        this.removeDataCallback = fn;
    }

    removeOnRemoveData() {
        this.removeDataCallback = null;
    }
}

export namespace socket {
    export type Names = keyof T.Except<
        Slices,
        'App'
    >;

    export type AddedData = {
        [_Name in Names]?: (
            ReturnType<
                Slices[_Name]['getInitialState']
            > extends EntityState<infer _State, string>
                ? _State[]
                : never
        )
    };

    export type RemovedData = {
        [_Name in Names]?: string[];
    };

    export type AddDataCallback = (data: socket.AddedData) => void;

    export type RemoveDataCallback = (data: socket.RemovedData) => void;
}

export const socket = new FakeSocket();