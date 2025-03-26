import { T } from '@lesnoypudge/types-utils-base/namespace';
import { MutableRefObject } from 'react';
import { NavigateOptions, To } from 'react-router';



export namespace Types {
    export type Context = {
        pathname: string;
        pathnameRef: MutableRefObject<string>;
        navigate: (to: To, options?: NavigateOptions) => void;
    };

    export type ParamsContext = {
        params: T.UnknownRecord;
    };
}