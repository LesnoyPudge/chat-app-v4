import { PropsWithInnerRef } from '@/types';
import { T } from '@lesnoypudge/types-utils-base/namespace';
import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { ChangeEventHandler, FocusEventHandler } from 'react';



export namespace RadioInputTypes {
    export type Context = T.Simplify<
        PropsWithInnerRef<'input'>
        & {
            id: string;
            name: string;
            valueName: string;
            required: boolean;
            readOnly: boolean;
            disabled: boolean;
            value: boolean;
            label: string;
            error: string | null;
            setValue: (value: Context['value']) => void;
            onChange: ChangeEventHandler<HTMLInputElement>;
            onBlur: FocusEventHandler<HTMLInputElement>;
        }
    >;

    export namespace Provider {
        type RequiredProps = Pick<Context, 'label' | 'valueName'>;

        type OptionalProps = Pick<
            Partial<Omit<Context, keyof RequiredProps>>,
            'disabled'
            | 'innerRef'
            | 'readOnly'
        >;

        export type Props = T.Simplify<
            RT.PropsWithRenderFunctionOrNode<[Context]>
            & RequiredProps
            & OptionalProps
        >;
    }

    export namespace Node {
        export type Props = RT.PropsWithChildrenAndClassName;
    }
}