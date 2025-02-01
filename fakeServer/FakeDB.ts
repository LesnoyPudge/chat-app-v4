
/* eslint-disable @typescript-eslint/no-dynamic-delete */
import { socket } from '@fakeSocket';
import { merge, parseJSON } from '@lesnoypudge/utils';
import { ClientEntities } from '@types';



type SettableData = (
    ClientEntities.Channel.Base
    | ClientEntities.Conversation.Base
    | ClientEntities.File.Base
    | ClientEntities.Message.Base
    | ClientEntities.Role.Base
    | ClientEntities.Server.Base
    | ClientEntities.TextChat.Base
    | ClientEntities.User.Base
    | ClientEntities.VoiceChat.Base
);



export namespace FakeDB {
    export type Options = {
        localStorage?: globalThis.Storage;
        socket?: typeof socket;
    };

    export type Storage = {
        channel: Record<string, ClientEntities.Channel.Base>;
        conversation: Record<string, ClientEntities.Conversation.Base>;
        file: Record<string, ClientEntities.File.Base>;
        message: Record<string, ClientEntities.Message.Base>;
        role: Record<string, ClientEntities.Role.Base>;
        server: Record<string, ClientEntities.Server.Base>;
        textChat: Record<string, ClientEntities.TextChat.Base>;
        user: Record<string, ClientEntities.User.Base>;
        voiceChat: Record<string, ClientEntities.VoiceChat.Base>;
    };
}

export class FakeDB {
    private storage: FakeDB.Storage;
    private version: number;
    private dbName: string;
    private localStorage: globalThis.Storage | undefined;

    constructor(options?: FakeDB.Options) {
        this.version = 1;
        this.dbName = `db-${this.version}`;
        this.localStorage = options?.localStorage;

        const db = this.localStorage?.getItem(this.dbName);

        if (db) {
            const parsedDB = parseJSON(db) as FakeDB.Storage;
            this.storage = parsedDB;
            return;
        }

        this.storage = this.createEmptyStorage();

        this.saveStorage();
    }

    private saveStorage() {
        this.localStorage?.setItem(this.dbName, JSON.stringify(this.storage));
    }

    clearStorage() {
        this.storage = this.createEmptyStorage();
        this.saveStorage();
    }

    createEmptyStorage() {
        return {
            channel: {},
            conversation: {},
            file: {},
            message: {},
            role: {},
            server: {},
            textChat: {},
            user: {},
            voiceChat: {},
        };
    }

    getStorageClone() {
        return structuredClone(this.storage);
    }

    set(data: Partial<FakeDB.Storage>) {
        this.storage = merge(this.storage, data) as FakeDB.Storage;
        this.saveStorage();

        return this.storage;
    }

    create<
        _Key extends keyof FakeDB.Storage,
    >(tableKey: _Key, data: FakeDB.Storage[_Key][string]): FakeDB.Storage[_Key][string] {
        this.storage[tableKey][data.id] = data;
        this.saveStorage();

        return data;
    }

    update<
        _Key extends keyof FakeDB.Storage,
    >(
        tableKey: _Key,
        id: string,
        fn: (item: FakeDB.Storage[_Key][string]) => FakeDB.Storage[_Key][string],
    ): FakeDB.Storage[_Key][string] | undefined {
        const item = this.storage[tableKey][id] as FakeDB.Storage[_Key][string] | undefined;
        if (!item) return undefined;

        const updatedItem = {
            ...item,
            ...fn(item),
        };

        this.storage[tableKey][id] = updatedItem;
        this.saveStorage();

        return updatedItem;
    }

    delete(tableKey: keyof FakeDB.Storage, id: string): boolean {
        const item = this.storage[tableKey][id];
        if (!item) return false;

        delete this.storage[tableKey][id];
        this.saveStorage();

        return true;
    }

    getOne<
        _Key extends keyof FakeDB.Storage,
    >(
        tableKey: _Key,
        predicate: (items: FakeDB.Storage[_Key][string]) => boolean,
    ): FakeDB.Storage[_Key][string] | undefined {
        const items = Object.values(
            this.storage[tableKey],
        ) as FakeDB.Storage[_Key][string][];

        const item = items.find((value) => {
            return predicate(value);
        });

        return item;
    }

    getMany<
        _Key extends keyof FakeDB.Storage,
    >(
        tableKey: _Key,
        predicate: (items: FakeDB.Storage[_Key][string]) => boolean,
    ): FakeDB.Storage[_Key][string][] {
        const items = Object.values(
            this.storage[tableKey],
        ) as FakeDB.Storage[_Key][string][];

        const foundItems = items.filter((value) => {
            return predicate(value);
        });

        return foundItems;
    }

    getById<
        _Key extends keyof FakeDB.Storage,
    >(tableKey: _Key, id: string): FakeDB.Storage[_Key][string] | undefined {
        return this.getOne(tableKey, (item) => item.id === id);
    }

    getByIds<
        _Key extends keyof FakeDB.Storage,
    >(tableKey: _Key, ids: string[]): FakeDB.Storage[_Key][string][] {
        return this.getMany(tableKey, (item) => ids.includes(item.id));
    }
}

export const db = new FakeDB({
    localStorage,
    socket,
});