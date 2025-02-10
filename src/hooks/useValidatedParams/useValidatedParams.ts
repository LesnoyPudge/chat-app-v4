import { Navigator } from '@features';
import { sharedValidators } from '@fakeShared';
import { T } from '@lesnoypudge/types-utils-base/namespace';
import { invariant } from '@lesnoypudge/utils';
import { useRef } from 'react';
import { useParams } from 'react-router';
import * as v from 'valibot';



type PathToParams = typeof Navigator['pathToParams'];

const presets = {
    invitation: v.object({
        invitationCode: sharedValidators.singleCommonString,
    }),
    channel: v.object({
        serverId: sharedValidators.id,
        channelId: sharedValidators.id,
    }),
    conversation: v.object({
        conversationId: sharedValidators.id,
    }),
    server: v.object({
        serverId: sharedValidators.id,
    }),
} satisfies T.ConditionalExcept<{
    [_Key in keyof PathToParams]: (
        T.IsEqual<PathToParams[_Key]['length'], 0> extends true
            ? never
            : v.GenericSchema<Record<
                T.ArrayValues<PathToParams[_Key]>,
                string
            >>
    )
}, never>;

export const useValidatedParams = <
    _Key extends keyof typeof presets,
>(
    presetKey: _Key,
): v.InferOutput<typeof presets[_Key]> => {
    const params = useParams();
    const prevParamsRef = useRef(params);

    prevParamsRef.current = params;

    const parsed = v.safeParse(presets[presetKey], params);
    invariant(parsed.success);

    return parsed.output;
};