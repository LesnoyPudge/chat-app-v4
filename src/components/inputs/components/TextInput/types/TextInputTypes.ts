import { PropsWithInnerRef } from '@/types';
import { T } from '@lesnoypudge/types-utils-base/namespace';
import { RT } from '@lesnoypudge/types-utils-react/namespace';
import {
    ChangeEventHandler,
    FocusEventHandler,
    HTMLInputAutoCompleteAttribute,
} from 'react';
import { Form } from '@/components';



export namespace TextInputTypes {
    export type Context = T.Simplify<
        PropsWithInnerRef<'input'>
        & {
            id: string;
            name: string;
            placeholder: string;
            minLength: number;
            maxLength: number;
            inputMode: 'text' | 'email';
            required: boolean;
            readOnly: boolean;
            disabled: boolean;
            type: 'text' | 'email' | 'password';
            initialType: Context['type'];
            value: string;
            label: string;
            error: string | null;
            autoComplete: HTMLInputAutoCompleteAttribute;
            setType: (type: Context['type']) => void;
            setValue: Form.Types.SetValue<Context['value']>;
            onChange: ChangeEventHandler<HTMLInputElement>;
            onBlur: FocusEventHandler<HTMLInputElement>;
        }
    >;

    export namespace Provider {
        type RequiredProps = Pick<Context, 'label'>;

        export type PropsWithDefaultValues = Pick<
            Omit<Context, keyof RequiredProps>,
            'disabled'
            | 'inputMode'
            | 'maxLength'
            | 'minLength'
            | 'readOnly'
            | 'placeholder'
            | 'autoComplete'
            | 'required'
        >;

        type OptionalProps = (
            Partial<PropsWithDefaultValues>
            & Pick<
                Partial<Omit<Context, keyof RequiredProps>>,
                'innerRef'
                | 'type'
            >
        );

        export type Props = T.Simplify<
            RT.PropsWithRenderFunctionOrNode<[Context]>
            & RequiredProps
            & OptionalProps
        >;
    }

    export namespace Node {
        export type Props = RT.PropsWithClassName;
    }

    export namespace NodePure {
        type KeysToIgnore = keyof Pick<
            Context,
            'initialType' | 'setType' | 'setValue'
        >;

        type ContextToSelect = T.Except<Context, KeysToIgnore>;

        type RequiredProps = Pick<
            ContextToSelect,
            'label'
            | 'name'
            | 'onChange'
            | 'value'
            | 'type'
        >;

        type OptionalProps = Partial<T.Except<
            ContextToSelect,
            keyof RequiredProps
        >>;

        export type Props = T.Simplify<(
            Node.Props
            & RequiredProps
            & OptionalProps
        )>;
    }
}