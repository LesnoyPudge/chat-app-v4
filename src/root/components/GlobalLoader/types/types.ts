import type { Overlay } from '@/components';
import { PropsWithChildren } from 'react';



export namespace Types {
    export type Context = {
        isEnabled: boolean;
        enable: VoidFunction;
        disable: VoidFunction;
    };

    export type ActionComponentProps = (
        PropsWithChildren
        & {
            displayId?: string;
        }
    );
}