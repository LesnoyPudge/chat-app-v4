import { LazyModules } from '@/features';



export namespace Types {
    export type ModuleNames = LazyModules.ModuleNames;

    export type Context = {
        instance: LazyModules;
        isLoaded: boolean;
    };
}