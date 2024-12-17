import { sharedValidators } from '@fakeShared';
import { invariant, shallowEqual } from '@lesnoypudge/utils';
import { useRef } from 'react';
import { useParams } from 'react-router';
import * as v from 'valibot';



const presets = {
    invitationScreen: v.object({
        invitationCode: sharedValidators.id,
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