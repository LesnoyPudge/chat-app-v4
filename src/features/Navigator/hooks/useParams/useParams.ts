import { invariant } from '@lesnoypudge/utils';
import { useParamsValidator } from '../useParamsValidator';
import { Valibot } from '@/libs';



export const useParams = <
    _Key extends keyof useParamsValidator.Presets,
>(
    presetKey: _Key,
): Valibot.InferOutput<useParamsValidator.Presets[_Key]> => {
    const parsed = useParamsValidator(presetKey);

    invariant(parsed.success);

    return parsed.output;
};