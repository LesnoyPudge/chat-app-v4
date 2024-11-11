import mongoose from 'mongoose';



namespace MongoDB {
    export type Options = {
        connectionUrl: string;
    };
}

export class MongoDB {
    options: MongoDB.Options;

    constructor(options: MongoDB.Options) {
        this.options = options;
    }

    async connect() {
        mongoose.set('strictQuery', true);
        return await mongoose.connect(this.options.connectionUrl);
    }
}