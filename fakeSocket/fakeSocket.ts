import { Store } from '@/features';
import { EntityState } from '@reduxjs/toolkit';
import { autoBind } from '@lesnoypudge/utils';
import { logger } from '@/utils';



// class FakeSocket {
//     store: socket.Store;
//     isConnected: boolean;
//     addDataTimeoutId: number | undefined;
//     removeDataTimeoutId: number | undefined;
//     addDataBroadcastBuffer: socket.AddedData;
//     removeDataBroadcastBuffer: socket.RemovedData;

//     constructor() {
//         this.isConnected = false;
//         this.addDataBroadcastBuffer = this.createEmptyBuffer();
//         this.removeDataBroadcastBuffer = this.createEmptyBuffer();
//         this.store = {
//             Channels: new Map(),
//             Conversations: new Map(),
//             Messages: new Map(),
//             Roles: new Map(),
//             Servers: new Map(),
//             TextChats: new Map(),
//             Users: new Map(),
//         };
//     }

//     createEmptyBuffer() {
//         return {
//             Channels: [],
//             Conversations: [],
//             Messages: [],
//             Roles: [],
//             Servers: [],
//             TextChats: [],
//             Users: [],
//             VoiceChats: [],
//         };
//     }

//     mergeAddBuffer(data: socket.AddedData) {
//         const result: socket.AddedData = {};
//         const keys = Object.keys<socket.AddedData>(
//             this.addDataBroadcastBuffer,
//         );

//         for (const key of keys) {
//             const list = [...new Set([
//                 ...(this.addDataBroadcastBuffer[key] ?? []),
//                 ...(data[key] ?? []),
//             ])];

//             Object.assign(
//                 result,
//                 {
//                     [key]: list,
//                 },
//             );
//         }

//         this.addDataBroadcastBuffer = result;
//     }

//     mergeRemoveBuffer(data: socket.RemovedData) {
//         const result: socket.RemovedData = {};
//         const keys = Object.keys<socket.RemovedData>(
//             this.removeDataBroadcastBuffer,
//         );

//         for (const key of keys) {
//             const list = [...new Set([
//                 ...(this.removeDataBroadcastBuffer[key] ?? []),
//                 ...(data[key] ?? []),
//             ])];

//             result[key] = list;
//         }

//         this.removeDataBroadcastBuffer = result;
//     }

//     addDataCallback: socket.AddDataCallback | null = null;

//     removeDataCallback: socket.RemoveDataCallback | null = null;

//     connect() {
//         this.isConnected = true;
//     }

//     disconnect() {
//         this.isConnected = false;
//     }

//     unsubscribe(
//         listenerId: string,
//         entityName: socket.Names,
//         ids: string[],
//     ) {
//         const entityIdToListenerIds = this.store[entityName];

//         ids.forEach((id) => {
//             const listenerIds = entityIdToListenerIds.get(id);
//             if (!listenerIds) return;

//             if (listenerIds.length <= 1) {
//                 entityIdToListenerIds.delete(id);
//                 return;
//             }

//             const newListenerIds = listenerIds.filter((item) => {
//                 return item !== listenerId;
//             });

//             entityIdToListenerIds.set(id, newListenerIds);
//         });
//     }

//     subscribe(
//         listenerId: string,
//         entityName: socket.Names,
//         ids: string[],
//     ) {
//         const entityIdToListenerIds = this.store[entityName];

//         ids.forEach((id) => {
//             let listenerIds = entityIdToListenerIds.get(id);

//             if (!listenerIds) {
//                 listenerIds = [];
//                 entityIdToListenerIds.set(id, listenerIds);
//             }

//             listenerIds.push(listenerId);
//         });

//         return () => this.unsubscribe(listenerId, entityName, ids);
//     }

//     // broadcast<_Type extends 'add' | 'remove'>(
//     //     type: _Type,
//     //     data: (
//     //         _Type extends 'add'
//     //             ? socket.AddedData
//     //             : socket.RemovedData
//     //     ),
//     // ) {
//     //     let timeoutId: number | undefined;

//     //     switch (type) {
//     //         case 'add': {
//     //             timeoutId = this.addDataTimeoutId;
//     //             this.mergeAddBuffer(data as socket.AddedData);
//     //             break;
//     //         }

//     //         case 'remove': {
//     //             timeoutId = this.removeDataTimeoutId;
//     //             this.mergeRemoveBuffer(data as socket.RemovedData);
//     //             break;
//     //         }

//     //         default: {
//     //             never();
//     //         }
//     //     }

//     //     timeoutId && clearInterval(timeoutId);

//     //     const newTimeoutId = setInterval(() => {
//     //         if (!this.isConnected) return;

//     //         switch (type) {
//     //             case 'add': {
//     //                 this.addDataCallback?.(this.addDataBroadcastBuffer);
//     //                 this.addDataBroadcastBuffer = this.createEmptyBuffer();
//     //                 break;
//     //             }

//     //             case 'remove': {
//     //                 this.removeDataCallback?.(this.removeDataBroadcastBuffer);
//     //                 this.removeDataBroadcastBuffer = this.createEmptyBuffer();
//     //                 break;
//     //             }

//     //             default: {
//     //                 never();
//     //             }
//     //         }

//     //         clearInterval(newTimeoutId);
//     //     }, 300);

//     //     switch (type) {
//     //         case 'add': {
//     //             this.addDataTimeoutId = newTimeoutId;
//     //             break;
//     //         }

//     //         case 'remove': {
//     //             this.removeDataTimeoutId = newTimeoutId;
//     //             break;
//     //         }

//     //         default: {
//     //             never();
//     //         }
//     //     }

//     //     // for (const entityName of Object.keys(data) as socket.Names[]) {
//     //     //     const entityData = data[entityName];
//     //     //     if (!entityData) continue;

//     //     //     const entityIdToListenerIds = this.store[entityName];

//     //     //     if (type === 'add') {
//     //     //         for (const entity of entityData as (
//     //     //             Required<socket.AddedData>[socket.Names]
//     //     //         )) {
//     //     //             if (!entityIdToListenerIds.has(entity.id)) continue;
//     //     //         }

//     //     //         continue;
//     //     //     }
//     //     // }
//     // }

//     addData(data: socket.AddedData) {
//         this.addDataCallback?.(data);
//         // this.broadcast('add', data);
//     }

//     removeData(data: socket.RemovedData) {
//         this.removeDataCallback?.(data);
//         // this.broadcast('remove', data);
//     }

//     onAddData(fn: socket.AddDataCallback) {
//         this.addDataCallback = fn;
//     }

//     removeOnAddData() {
//         this.addDataCallback = null;
//     }

//     onRemoveData(fn: socket.RemoveDataCallback) {
//         this.removeDataCallback = fn;
//     }

//     removeOnRemoveData() {
//         this.removeDataCallback = null;
//     }

//     addDataFromStorage(storage: FakeDB.Storage) {
//         this.addData(structuredClone({
//             Channels: Object.values(storage.channel),
//             Conversations: Object.values(storage.conversation),
//             Messages: Object.values(storage.message),
//             Roles: Object.values(storage.role),
//             Servers: Object.values(storage.server),
//             TextChats: Object.values(storage.textChat),
//             Users: Object.values(storage.user),
//         }));
//     }
// }


class FakeSocket {
    private isConnected: boolean;
    private addDataBuffer: socket.AddedData;
    private removeDataBuffer: socket.RemovedData;
    private addDataCallback: socket.AddDataCallback | null;
    private removeDataCallback: socket.RemoveDataCallback | null;
    private isLocked: boolean;
    private isEmpty: boolean;
    private isIgnored: boolean;

    constructor() {
        this.isConnected = false;
        this.addDataBuffer = this.createEmptyBuffer();
        this.removeDataBuffer = this.createEmptyBuffer();
        this.addDataCallback = null;
        this.removeDataCallback = null;
        this.isLocked = true;
        this.isEmpty = true;
        this.isIgnored = false;

        setInterval(() => {
            if (!this.isConnected) return;
            if (this.isLocked) return;
            if (this.isEmpty) return;
            if (!this.addDataCallback) return;
            if (!this.removeDataCallback) return;

            logger.socket.log('tick');
            logger.socket.log(this.addDataBuffer);
            logger.socket.log(this.removeDataBuffer);

            this.isEmpty = true;

            this.addDataCallback(this.addDataBuffer);
            this.removeDataCallback(this.removeDataBuffer);

            this.addDataBuffer = this.createEmptyBuffer();
            this.removeDataBuffer = this.createEmptyBuffer();
        }, 100);

        autoBind(this);
    }

    private createEmptyBuffer() {
        return {
            Channels: [],
            Conversations: [],
            Messages: [],
            Roles: [],
            Servers: [],
            TextChats: [],
            Users: [],
            VoiceChats: [],
        };
    }

    connect() {
        this.isConnected = true;
    }

    disconnect() {
        this.isConnected = false;
    }

    ignore() {
        this.isIgnored = true;
    }

    unignore() {
        this.isIgnored = false;
    }

    lock() {
        this.isLocked = true;
    }

    unlock() {
        this.isLocked = false;
    }

    private mergeBufferWithData(
        buffer: socket.AddedData | socket.RemovedData,
        data: socket.AddedData | socket.RemovedData,
    ) {
        Object.keys<socket.AddedData>(data).forEach((dataKey) => {
            const newData = [
                ...(buffer[dataKey] ?? []),
                ...(data[dataKey] ?? []),
            ];

            Object.assign(buffer, {
                [dataKey]: newData,
            });
        });
    }

    addData(data: socket.AddedData) {
        if (this.isIgnored) return;

        logger.socket.log('add data', data);

        this.mergeBufferWithData(this.addDataBuffer, data);
        this.isEmpty = false;
    }

    removeData(data: socket.RemovedData) {
        if (this.isIgnored) return;

        logger.socket.log('remove data', data);

        this.mergeBufferWithData(this.removeDataBuffer, data);
        this.isEmpty = false;
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
    export type Names = keyof Store.Types.SlicesWithEntityAdapter;

    export type AddedData = {
        [_Name in Names]?: (
            ReturnType<
                Store.Types.SlicesWithEntityAdapter[_Name]['getInitialState']
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

    export type Store = Record<Names, Map<string, string[]>>;
}

export const socket = new FakeSocket();