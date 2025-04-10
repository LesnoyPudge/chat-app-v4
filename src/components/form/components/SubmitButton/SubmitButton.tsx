import { FC } from 'react';
import { Button } from '@/components';
import { T } from '@lesnoypudge/types-utils-base/namespace';
import { useFormContext, useStore } from '../../hooks';



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
    const { api } = useFormContext();
    const canSubmit = useStore(api.store, (v) => v.canSubmit);
    const isSubmitting = useStore(api.store, (v) => v.isSubmitting);

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