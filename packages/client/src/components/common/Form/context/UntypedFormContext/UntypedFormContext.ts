import { T } from '@lesnoypudge/types-utils-base/namespace';
import { createContextSelectable } from '@lesnoypudge/utils-react';
import { ReactFormExtendedApi, Validator } from '@tanstack/react-form';



export type UntypedFormContext<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _Shape extends T.UnknownRecord = any,
> = (
    {
        formApi: ReactFormExtendedApi<_Shape, Validator<_Shape>>;
        submitError: string | null;
    }
);

export const UntypedFormContext = createContextSelectable<
    UntypedFormContext
>();