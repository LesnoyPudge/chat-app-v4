import { Navigator } from '@entities';
import { sharedValidators } from '@fakeShared';
import { T } from '@lesnoypudge/types-utils-base/namespace';
import { invariant, shallowEqual } from '@lesnoypudge/utils';
import { useRef } from 'react';
import { useParams } from 'react-router';
import * as v from 'valibot';


type ParamNames = T.Writable<{
    [_Key in keyof typeof Navigator.params]: _Key;
}>;

const paramNames = (
    Object.keys<typeof Navigator.params>(Navigator.params)
        .reduce<ParamNames>((acc, cur) => {
            // @ts-expect-error
            acc[cur] = cur;
            return acc;
        }, {})
);

const presets = {
    invitationScreen: v.object({
        [paramNames.invitationCode]: sharedValidators.id,
    }),
    some: v.object({}),
} satisfies Record<string, v.GenericSchema>;

export const useValidatedParams = <
    _Key extends keyof typeof presets,
>(
    presetKey: _Key,
): v.InferOutput<typeof presets[_Key]> => {
    const params = useParams();
    const prevParamsRef = useRef(params);

    if (!shallowEqual(params, prevParamsRef.current)) {
        prevParamsRef.current = params;

        const parsed = v.safeParse(presets[presetKey], params);
        invariant(parsed.success);
    }

    return params;
};