import { T } from '@lesnoypudge/types-utils-base/namespace';
import { STATUS_CODE } from '@lesnoypudge/utils';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { ElementRef, RefObject } from 'react';



export type PropsWithInnerRef<
    _TagName extends keyof JSX.IntrinsicElements = never,
> = {
    innerRef?: (
        T.IsNever<_TagName> extends true
            ? RefObject<HTMLElement>
            : RefObject<ElementRef<_TagName>>
    );
};

export type WithId = {
    id: string;
};

export type CustomQueryError = T.Simplify<
    Exclude<FetchBaseQueryError, { status: number; data: unknown }>
    | {
        status: T.ValueOf<T.Except<typeof STATUS_CODE, 'OK'>>;
        data: {
            message: string;
        };
    }
>;