import { FC } from 'react';
import { Button } from '@/components';
import { T } from '@lesnoypudge/types-utils-base/namespace';
import { useFormStore } from '../../hooks';



export namespace SubmitButton {
    export type Props = T.Except<
        Button.Props,
        'type'
    >;
}

export const SubmitButton: FC<SubmitButton.Props> = ({
    className = '',
    children,
    isLoading,
    isDisabled,
    ...rest
}) => {
    const canSubmit = useFormStore((v) => v.canSubmit);
    const isSubmitting = useFormStore((v) => v.isSubmitting);

    return (
        <Button
            className={className}
            type='submit'
            isLoading={isSubmitting || isLoading}
            isDisabled={!canSubmit || isDisabled}
            {...rest}
        >
            {children}
        </Button>
    );
};