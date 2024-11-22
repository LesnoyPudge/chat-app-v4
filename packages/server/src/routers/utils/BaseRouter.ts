import { App } from '@types';
import { Router } from 'express';



export namespace BaseRouter {
    export type Deps = {
        app: App;
    };
}

export abstract class BaseRouter {
    protected router = Router();

    constructor(deps: BaseRouter.Deps) {
        deps.app.use(this.router);
    }

    register() {
        throw new Error('Not Implemented');
    }
}