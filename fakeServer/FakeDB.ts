/* eslint-disable @typescript-eslint/no-dynamic-delete */
import { socket } from '@/fakeSocket';
import { T } from '@lesnoypudge/types-utils-base/namespace';
import { autoBind, capitalize, invariant, merge } from '@lesnoypudge/utils';
import { ClientEntities } from '@/types';
import { env } from '@/vars';
import localforage from 'localforage';



export namespace FakeDB {
    export type Storage = {
        channel: Record<string, ClientEntities.Channel.Base>;
        conversation: Record<string, ClientEntities.Conversation.Base>;
        file: Record<string, ClientEntities.File.Base>;
        message: Record<string, ClientEntities.Message.Base>;
        role: Record<string, ClientEntities.Role.Base>;
        server: Record<string, ClientEntities.Server.Base>;
        textChat: Record<string, ClientEntities.TextChat.Base>;
        user: Record<string, ClientEntities.User.Base>;
    };
}

export class FakeDB {
    private storage: FakeDB.Storage | undefined;
    private version: number;
    private dbName: string;
    private externalStorage: LocalForage | undefined;

    constructor() {
        this.version = 1;
        this.dbName = `db-${this.version}`;
        this.externalStorage = localforage;

        this.externalStorage.config({
            // driver: localforage.WEBSQL, // Force WebSQL; same as using setDriver()
            name: env._PUBLIC_APP_NAME,
            version: this.version,
            // size: 4_980_736, // Size of database, in bytes. WebSQL-only for now.
            storeName: this.dbName, // Should be alphanumeric, with underscores.
            // description: 'some description',
        });

        autoBind(this);
    }

    async init() {
        invariant(this.externalStorage);

        const parsedDB = await this.externalStorage.getItem(this.dbName);

        if (parsedDB) {
            this.storage = parsedDB as FakeDB.Storage;
            return this;
        }

        this.storage = this.createEmptyStorage();

        await this.saveStorage();

        return this;
    }

    private async saveStorage() {
        invariant(this.externalStorage);

        await this.externalStorage.setItem(
            this.dbName,
            this.storage,
        );
    }

    async clearStorage() {
        this.storage = this.createEmptyStorage();
        await this.saveStorage();
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

    getStorageClone(): FakeDB.Storage {
        invariant(this.storage);

        return structuredClone(this.storage);
    }

    async set(data: Partial<FakeDB.Storage>) {
        invariant(this.storage);

        this.storage = merge(this.storage, data) as FakeDB.Storage;
        await this.saveStorage();

        return this.storage;
    }

    async create<
        _Key extends keyof FakeDB.Storage,
    >(
        tableKey: _Key,
        item: FakeDB.Storage[_Key][string],
    ): Promise<FakeDB.Storage[_Key][string]> {
        invariant(this.storage);

        this.storage[tableKey][item.id] = item;

        await this.saveStorage();

        socket.addData({
            [capitalize(`${tableKey}s`)]: [item],
        });

        return item;
    }

    async update<
        _Key extends keyof FakeDB.Storage,
    >(
        tableKey: _Key,
        id: string,
        updater: (item: FakeDB.Storage[_Key][string]) => (
            T.Promisable<FakeDB.Storage[_Key][string]>
        ),
    ): Promise<FakeDB.Storage[_Key][string] | undefined> {
        invariant(this.storage);

        const item = this.storage[tableKey][id] as (
            FakeDB.Storage[_Key][string] | undefined
        );
        if (!item) return undefined;

        const updatedItem = await updater(structuredClone(item));

        this.storage[tableKey][id] = updatedItem;

        await this.saveStorage();

        socket.addData({
            [capitalize(`${tableKey}s`)]: [updatedItem],
        });

        return updatedItem;
    }

    async delete(
        tableKey: keyof FakeDB.Storage,
        id: string,
    ): Promise<boolean> {
        invariant(this.storage);

        const item = this.storage[tableKey][id];
        if (!item) return false;

        delete this.storage[tableKey][id];

        await this.saveStorage();

        socket.removeData({
            [capitalize(`${tableKey}s`)]: [item],
        });

        return true;
    }

    getOne<
        _Key extends keyof FakeDB.Storage,
    >(
        tableKey: _Key,
        predicate: (items: FakeDB.Storage[_Key][string]) => boolean,
    ): FakeDB.Storage[_Key][string] | undefined {
        invariant(this.storage);

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
        invariant(this.storage);

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
    >(
        tableKey: _Key,
        id: string | undefined,
    ): FakeDB.Storage[_Key][string] | undefined {
        if (id === undefined) return;

        return this.getOne(tableKey, (item) => item.id === id);
    }

    getByIds<
        _Key extends keyof FakeDB.Storage,
    >(tableKey: _Key, ids: string[]): FakeDB.Storage[_Key][string][] {
        const idSet = new Set(ids);

        return this.getMany(tableKey, (item) => idSet.has(item.id));
    }
}

// its ok export db like this since we only use it inside
// fakeServer and its dependencies.
export let db: FakeDB;
let isLoading = false;
let isLoaded = false;

export const initDB = async () => {
    if (isLoading) return;
    if (isLoaded) return;

    isLoading = true;

    try {
        db = await new FakeDB().init();
    } catch (error) {
        isLoading = false;
        throw error;
    }

    isLoading = false;
    isLoaded = true;
};