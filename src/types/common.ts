import { ReduxToolkitQueryReact } from '@/libs';
import { T } from '@lesnoypudge/types-utils-base/namespace';
import { HTTP_STATUS_CODES } from '@lesnoypudge/utils';
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
    Exclude<
        ReduxToolkitQueryReact.FetchBaseQueryError,
        { status: number; data: unknown }
    >
    | {
        status: T.ValueOf<T.Except<typeof HTTP_STATUS_CODES, 'OK'>>;
        data: {
            message: string;
        };
    }
>;

export namespace Direction {
    export type Single = 'horizontal' | 'vertical';

    export type All = 'horizontal' | 'vertical' | 'both';
}