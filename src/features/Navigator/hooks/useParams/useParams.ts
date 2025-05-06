import { invariant } from '@lesnoypudge/utils';
import * as v from 'valibot';
import { useParamsValidator } from '../useParamsValidator';



export const useParams = <
    _Key extends keyof useParamsValidator.Presets,
>(
    presetKey: _Key,
): v.InferOutput<useParamsValidator.Presets[_Key]> => {
    const parsed = useParamsValidator(presetKey);

    invariant(parsed.success);

    return parsed.output;
};