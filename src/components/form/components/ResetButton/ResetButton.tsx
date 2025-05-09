import { FC } from 'react';
import { Button } from '@/components';
import { T } from '@lesnoypudge/types-utils-base/namespace';
import { useFormStore } from '../../hooks';



export namespace ResetButton {
    export type Props = T.Except<
        Button.Props,
        'type'
    >;
}

export const ResetButton: FC<ResetButton.Props> = ({
    className = '',
    children,
    isDisabled,
    ...rest
}) => {
    const isDirty = useFormStore((v) => v.isDirty);
    const isSubmitting = useFormStore((v) => v.isSubmitting);

    const shouldDisable = (
        isSubmitting
        || !isDirty
        || isDisabled
    );

    return (
        <Button
            className={className}
            type='submit'
            isDisabled={shouldDisable}
            {...rest}
        >
            {children}
        </Button>
    );
};