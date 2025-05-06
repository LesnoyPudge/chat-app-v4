import { Navigator } from '@/features';
import { sharedValidators } from '@/fakeShared';
import { T } from '@lesnoypudge/types-utils-base/namespace';
import * as v from 'valibot';
import { ContextSelectable } from '@lesnoypudge/utils-react';
import { ParamsContext } from '../../context';



export namespace useParamsValidator {
    type PathToParams = typeof Navigator['pathToParams'];

    export type Presets = T.ConditionalExcept<{
        [_Key in keyof PathToParams]: (
            T.IsEqual<PathToParams[_Key]['length'], 0> extends true
                ? never
                : v.GenericSchema<Record<
                    T.ArrayValues<PathToParams[_Key]>,
                    string
                >>
        )
    }, never>;
}

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
} satisfies useParamsValidator.Presets;

export const useParamsValidator = <
    _Key extends keyof useParamsValidator.Presets,
>(
    presetKey: _Key,
): v.SafeParseResult<useParamsValidator.Presets[_Key]> => {
    const params = ContextSelectable.useSelector(
        ParamsContext,
        ({ params }) => params,
    );

    const parsed = v.safeParse(presets[presetKey], params);

    return parsed;
};