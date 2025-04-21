import { T } from '@lesnoypudge/types-utils-base/namespace';
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

export namespace Direction {
    export type Single = 'horizontal' | 'vertical';

    export type All = 'horizontal' | 'vertical' | 'both';
}

export type ScenarioVariants = (
    'none'
    | 'populateSmall'
    | 'populateMedium'
    | 'populateLarge'
    | 'minimalScene'
);