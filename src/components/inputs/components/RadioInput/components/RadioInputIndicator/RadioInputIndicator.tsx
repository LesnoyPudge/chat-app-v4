import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { cn, createStyles } from '@/utils';
import { FC } from 'react';
import { useRadioInputContext } from '../../hooks';



const styles = createStyles({
    wrapper: `
        flex 
        size-6 
        shrink-0 
        rounded-full 
        border-2 
        border-current 
        p-1
    `,
    inner: {
        base: `
            m-auto 
            size-full 
            scale-0 
            rounded-full 
            bg-current 
            transition-all
        `,
        active: 'scale-100',
    },
});

export const RadioInputIndicator: FC<RT.PropsWithClassName> = ({
    className = '',
}) => {
    const { value, valueName } = useRadioInputContext();
    const isChecked = value === valueName;

    return (
        <div className={cn(styles.wrapper, className)}>
            <div className={cn(
                styles.inner.base,
                isChecked && styles.inner.active,
            )}>
            </div>
        </div>
    );
};