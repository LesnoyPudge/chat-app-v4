import { ElementRef, RefObject } from 'react';



export type PropsWithInnerRef<_TagName extends keyof JSX.IntrinsicElements> = {
    innerRef?: RefObject<ElementRef<_TagName>>;
};