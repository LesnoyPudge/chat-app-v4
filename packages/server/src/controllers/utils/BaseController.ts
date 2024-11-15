import { DB } from '@types';



export namespace BaseController {
    export type Deps = {
        db: DB;
    };
}

export class BaseController {
    protected db: BaseController.Deps['db'];

    constructor(deps: BaseController.Deps) {
        this.db = deps.db;
    }
}