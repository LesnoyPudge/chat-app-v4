import { Navigator } from '@/features';
import { sharedValidators } from '@/fakeShared';
import { T } from '@lesnoypudge/types-utils-base/namespace';
import { ContextSelectable } from '@lesnoypudge/utils-react';
import { ParamsContext } from '../../context';
import { Valibot } from '@/libs';



export namespace useParamsValidator {
    type PathToParams = typeof Navigator['pathToParams'];

    export type Presets = T.ConditionalExcept<{
        [_Key in keyof PathToParams]: (
            T.IsEqual<PathToParams[_Key]['length'], 0> extends true
                ? never
                : Valibot.GenericSchema<Record<
                    T.ArrayValues<PathToParams[_Key]>,
                    string
                >>
        )
    }, never>;
}

const presets = {
    invitation: Valibot.object({
        invitationCode: sharedValidators.singleCommonString,
    }),
    channel: Valibot.object({
        serverId: sharedValidators.id,
        channelId: sharedValidators.id,
    }),
    conversation: Valibot.object({
        conversationId: sharedValidators.id,
    }),
    server: Valibot.object({
        serverId: sharedValidators.id,
    }),
} satisfies useParamsValidator.Presets;

export const useParamsValidator = <
    _Key extends keyof useParamsValidator.Presets,
>(
    presetKey: _Key,
): Valibot.SafeParseResult<useParamsValidator.Presets[_Key]> => {
    const params = ContextSelectable.useSelector(
        ParamsContext,
        ({ params }) => params,
    );

    const parsed = Valibot.safeParse(presets[presetKey], params);

    return parsed;
};