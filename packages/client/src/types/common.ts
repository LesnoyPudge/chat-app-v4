import { T } from '@lesnoypudge/types-utils-base/namespace';
import { STATUS_CODE } from '@lesnoypudge/utils';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { ElementRef, RefObject } from 'react';



export type PropsWithInnerRef<_TagName extends keyof JSX.IntrinsicElements> = {
    innerRef?: RefObject<ElementRef<_TagName>>;
};

export type WithId = {
    id: string;
};

export type CustomQueryError = T.Simplify<
    Exclude<FetchBaseQueryError, { status: number; data: unknown }>
    | {
        status: T.ValueOf<typeof STATUS_CODE>;
        data: {
            message: string;
        };
    }
>;