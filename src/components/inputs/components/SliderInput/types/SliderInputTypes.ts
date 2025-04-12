import { PropsWithInnerRef } from '@/types';
import { T } from '@lesnoypudge/types-utils-base/namespace';
import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { PartialFormatter } from 'nouislider';
import { Form } from '@/components';



export namespace SliderInputTypes {
    export type Context = T.Simplify<
        PropsWithInnerRef<'div'>
        & {
            id: string;
            name: string;
            range: number[];
            format: PartialFormatter;
            required: boolean;
            readOnly: boolean;
            disabled: boolean;
            value: number;
            label: string;
            error: string | null;
            setValue: Form.Types.SetValue<Context['value']>;
            onBlur: VoidFunction;
        }
    >;

    export namespace Provider {
        type RequiredProps = Pick<Context, 'label' | 'range'>;

        type OptionalProps = Pick<
            Partial<Omit<Context, keyof RequiredProps>>,
            'disabled'
            | 'format'
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
        export type Props = RT.PropsWithClassName;
    }
}