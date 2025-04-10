import { PropsWithInnerRef } from '@/types';
import { T } from '@lesnoypudge/types-utils-base/namespace';
import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { ChangeEventHandler, FocusEventHandler } from 'react';



export namespace CheckBoxTypes {
    export type Context = T.Simplify<
        PropsWithInnerRef<'input'>
        & {
            id: string;
            name: string;
            readOnly: boolean;
            disabled: boolean;
            label: string;
            error: string | null;
            value: boolean;
            setValue: (value: Context['value']) => void;
            onChange: ChangeEventHandler<HTMLInputElement>;
            onBlur: FocusEventHandler<HTMLInputElement>;
        }
    >;

    export namespace Provider {
        type RequiredProps = Pick<Context, 'label'>;

        type OptionalProps = Pick<
            Partial<Omit<Context, keyof RequiredProps>>,
            'innerRef'
            | 'readOnly'
            | 'disabled'
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