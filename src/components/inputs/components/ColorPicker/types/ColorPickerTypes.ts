import { PropsWithInnerRef } from '@/types';
import { T } from '@lesnoypudge/types-utils-base/namespace';
import { RT } from '@lesnoypudge/types-utils-react/namespace';



export namespace ColorPickerTypes {
    export type Context = T.Simplify<
        PropsWithInnerRef<'div'>
        & {
            id: string;
            colorPresets: string[];
            value: string;
            label: string;
            error: string | null;
            setValue: (value: Context['value']) => void;
        }
    >;

    export namespace Provider {
        type RequiredProps = Pick<Context, 'label'>;

        type OptionalProps = Pick<
            Partial<Omit<Context, keyof RequiredProps>>,
            'innerRef'
            | 'colorPresets'
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