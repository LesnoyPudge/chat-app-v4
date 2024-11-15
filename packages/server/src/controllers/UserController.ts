import { DB } from '@types';
import { db } from '../index';
import { T } from '@lesnoypudge/types-utils-base/namespace';
import { BaseController } from './utils';



export namespace UserController {
    export type Controller = {
        ['getUsers'](): Promise<unknown[]>;
    };
}

export class UserController
    extends BaseController
    implements UserController.Controller {
    ['getUsers']() {
        return Promise.resolve([]);
    }
}