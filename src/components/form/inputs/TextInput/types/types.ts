import { T } from '@lesnoypudge/types-utils-base/namespace';
import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { FieldApi, ValidationError } from '@tanstack/react-form';
import { PropsWithInnerRef } from '@/types';
import {
    ChangeEventHandler,
    FocusEventHandler,
    PropsWithChildren,
} from 'react';



export namespace Types {
    export type PropsWithDefaultValue = {
        placeholder: string;
        minLength: number;
        maxLength: number;
        inputMode: 'text' | 'email';
        required: boolean;
        readOnly: boolean;
        disabled: boolean;
        autoComplete: boolean;
        spellCheck: boolean;
    };

    type WithRef = PropsWithInnerRef<'input'>;

    export type InternalProps = T.Simplify<{
        id: string;
        name: string;
        error: ValidationError;
        errorId: string;
        value: string;
    }>;

    type WithLabel = {
        label: string;
    };

    type WithType = {
        type: 'text' | 'email' | 'password';
    };

    type WithHandlers = {
        onChange: ChangeEventHandler<HTMLInputElement>;
        onBlur: FocusEventHandler<HTMLInputElement>;
    };

    export type RequiredNodePureProps = T.Simplify<
        InternalProps
        & WithLabel
        & WithType
        & WithHandlers
    >;

    export type NodePureProps = T.Simplify<
        RT.PropsWithClassName
        & PropsWithDefaultValue
        & WithRef
        & RequiredNodePureProps
    >;

    type WithFieldApi = {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        field: FieldApi<any, any, any, any, string>;
    };

    export type NodeProps = T.Simplify<
        & RT.PropsWithClassName
        & WithRef
        & Partial<
            WithLabel
            & PropsWithDefaultValue
            & WithFieldApi
            & WithType
        >
    >;

    export type useTextInputProps = T.Simplify<
        WithFieldApi
        & WithType
    >;

    export type useTextInputReturn = T.Simplify<
        Pick<WithHandlers, 'onChange'>
        & WithType
        & Pick<InternalProps, 'errorId'>
        & {
            togglePasswordType: VoidFunction;
        }
    >;

    export type Context = T.Simplify<Required<
        PropsWithDefaultValue
        & useTextInputReturn
        & WithFieldApi
        & WithLabel
        & {
            initialType: WithType['type'];
        }
    >>;

    export type ContextProviderProps = T.Simplify<
        PropsWithChildren
        & WithFieldApi
        & Partial<PropsWithDefaultValue>
        & WithLabel
        & WithType
    >;

    export type useTextInputDefaultsProps = Partial<
        RT.PropsWithClassName
        & PropsWithDefaultValue
    >;

    export type useTextInputDefaultsReturn = Required<(
        RT.PropsWithClassName
        & PropsWithDefaultValue
    )>;
}