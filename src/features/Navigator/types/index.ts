import { MutableRefObject } from 'react';
import { NavigateOptions, To } from 'react-router';



export namespace Types {
    export type Context = {
        pathname: string;
        pathnameRef: MutableRefObject<string>;
        navigate: (to: To, options?: NavigateOptions) => void;
    };
}