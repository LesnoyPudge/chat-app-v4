import { T } from '@lesnoypudge/types-utils-base/namespace';



export namespace Types {
    type Module<_Extra extends T.UnknownRecord = T.EmptyObject> = (
        {
            isLoaded: boolean;
        }
        & _Extra
    );

    export type Context = {
        i18n: Module;
        server: Module;
        areAllModulesLoaded: boolean;
    };
}