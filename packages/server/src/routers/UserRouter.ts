import { Router } from 'express';
import { BaseRouter } from './utils';



export namespace UserRouter {
    export type Deps = BaseRouter.Deps;
}

export class UserRouter extends BaseRouter {
    register() {}
}