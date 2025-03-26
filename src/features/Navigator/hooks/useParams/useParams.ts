import { Navigator } from '@/features';
import { sharedValidators } from '@/fakeShared';
import { T } from '@lesnoypudge/types-utils-base/namespace';
import { invariant } from '@lesnoypudge/utils';
import * as v from 'valibot';
import { ContextSelectable } from '@lesnoypudge/utils-react';
import { ParamsContext } from '../../context';



type PathToParams = typeof Navigator['pathToParams'];

type Presets = T.ConditionalExcept<{
    [_Key in keyof PathToParams]: (
        T.IsEqual<PathToParams[_Key]['length'], 0> extends true
            ? never
            : v.GenericSchema<Record<
                T.ArrayValues<PathToParams[_Key]>,
                string
            >>
    )
}, never>;

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
} satisfies Presets;

export const useParams = <
    _Key extends keyof Presets,
>(
    presetKey: _Key,
): v.InferOutput<Presets[_Key]> => {
    const validParams = ContextSelectable.useSelector(
        ParamsContext,
        ({ params }) => {
            const parsed = v.safeParse(presets[presetKey], params);
            invariant(parsed.success);

            return parsed.output;
        },
    );

    return validParams;
};