/* eslint-disable @/typescript-eslint/no-unsafe-assignment */
/* eslint-disable @/typescript-eslint/no-explicit-any */
import { T } from '@lesnoypudge/types-utils-base/namespace';
import { capitalize } from '@lesnoypudge/utils';
import {
    useField as useFieldLib,
    FieldApi,
    ReactFormExtendedApi,
} from '@tanstack/react-form';



type Return<
    _Shape extends Record<string, any>,
    _Name extends keyof _Shape,
> = {
    [x in _Name as `${Capitalize<Extract<_Name, string>>}Field`]: (
        // @ts-expect-error
        FieldApi<_Shape, _Name, any, any, _Shape[_Name]>
    );
};

export const useField = <
    _Api extends ReactFormExtendedApi<any, any>,
    _Shape extends (
        _Api extends ReactFormExtendedApi<
            infer _Value extends Record<string, any>, any
        >
            ? _Value
            : never
    ),
    _Name extends keyof _Shape,
>(
    formApi: _Api,
    name: _Name,
) => {
    // @ts-ignore infinitely deep types 0.40.4
    const field = useFieldLib({ form: formApi, name: name }) as any;

    return {
        [`${capitalize(String(name))}Field`]: field,
    } as T.Simplify<Return<_Shape, _Name>>;
};