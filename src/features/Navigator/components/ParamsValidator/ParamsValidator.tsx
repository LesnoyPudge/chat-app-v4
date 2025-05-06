import { PropsWithChildren, useEffect } from 'react';
import { useNavigateTo, useParamsValidator } from '../../hooks';
import { logger } from '@/utils';



export namespace ParamsValidator {
    export type Props<
        _Key extends keyof useParamsValidator.Presets,
    > = (
        PropsWithChildren
        & {
            preset: _Key;
        }
    );
}

export const ParamsValidator = <
    _Key extends keyof useParamsValidator.Presets,
>({
    preset,
    children,
}: ParamsValidator.Props<_Key>) => {
    const parsed = useParamsValidator(preset);
    const { navigateTo } = useNavigateTo();

    useEffect(() => {
        if (parsed.success) return;

        logger._errors.log(
            `Failed to validate params with preset: ${preset}`,
        );
        logger._errors.trace();

        navigateTo.root({ flushSync: true, replace: true });
    }, [navigateTo, parsed.success, preset]);

    return parsed.success ? children : null;
};