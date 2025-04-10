import { ClientEntities, PropsWithInnerRef } from '@/types';
import { ACCEPTED_FILE_TYPE } from '@/vars';
import { T } from '@lesnoypudge/types-utils-base/namespace';
import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { FocusEventHandler } from 'react';



export namespace FileInputTypes {
    type Listener = (badFiles: ClientEntities.File.Invalid[]) => void;

    export type ConditionalValue<_Amount extends number = -1> = (
        T.IsEqual<_Amount, -1> extends true
            ? null | T.Arrayable<ClientEntities.File.Encoded>
            : T.IsEqual<_Amount, 1> extends true
                ? null | ClientEntities.File.Encoded
                : null | ClientEntities.File.Encoded[]
    );

    export type Context<_Amount extends number = -1> = T.Simplify<
        PropsWithInnerRef<'input'>
        & {
            id: string;
            name: string;
            hidden: boolean;
            accept: T.ValueOf<typeof ACCEPTED_FILE_TYPE>;
            amountLimit: _Amount;
            multiple: boolean;
            onAmountLimit: Listener;
            onSizeLimit: Listener;
            onUnacceptableType: Listener;
            onInvalid: Listener;
            sizeLimit: number;
            required: boolean;
            readOnly: boolean;
            disabled: boolean;
            value: ConditionalValue<_Amount>;
            label: string;
            error: string | null;
            setValue: (value: Context<_Amount>['value']) => void;
            onBlur: FocusEventHandler<HTMLInputElement>;
        }
    >;

    export namespace Provider {
        type RequiredProps<_Amount extends number = -1> = Pick<
            Context<_Amount>,
            'label' | 'amountLimit' | 'accept'
        >;

        type OptionalProps = Pick<
            Partial<Omit<Context<number>, keyof RequiredProps>>,
            'disabled'
            | 'innerRef'
            | 'readOnly'
            | 'onAmountLimit'
            | 'onSizeLimit'
            | 'onUnacceptableType'
            | 'onInvalid'
            | 'sizeLimit'
            | 'hidden'
        >;

        export type Props<_Amount extends number> = T.Simplify<
            RT.PropsWithRenderFunctionOrNode<[Context<_Amount>]>
            & RequiredProps<_Amount>
            & OptionalProps
        >;
    }

    export namespace Node {
        export type Props = RT.PropsWithChildrenAndClassName;
    }
}