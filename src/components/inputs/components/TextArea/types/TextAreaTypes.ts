import { PropsWithInnerRef } from '@/types';
import { T } from '@lesnoypudge/types-utils-base/namespace';
import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { ChangeEventHandler, FocusEventHandler } from 'react';



export namespace TextAreaTypes {
    export type Context = T.Simplify<
        PropsWithInnerRef<'input'>
        & {
            id: string;
            name: string;
            rows: number;
            placeholder: string;
            maxLength: number;
            required: boolean;
            readOnly: boolean;
            disabled: boolean;
            value: string;
            label: string;
            error: string | null;
            setValue: (value: Context['value']) => void;
            onChange: ChangeEventHandler<HTMLTextAreaElement>;
            onBlur: FocusEventHandler<HTMLTextAreaElement>;
        }
    >;

    export namespace Provider {
        type RequiredProps = Pick<Context, 'label'>;

        type OptionalProps = Pick<
            Partial<Omit<Context, keyof RequiredProps>>,
            'disabled'
            | 'innerRef'
            | 'maxLength'
            | 'readOnly'
            | 'placeholder'
            | 'rows'
        >;

        export type Props = T.Simplify<
            RT.PropsWithRenderFunctionOrNode<[Context]>
            & RequiredProps
            & OptionalProps
        >;
    }

    export namespace Node {
        export type Props = RT.PropsWithClassName;
    }
}