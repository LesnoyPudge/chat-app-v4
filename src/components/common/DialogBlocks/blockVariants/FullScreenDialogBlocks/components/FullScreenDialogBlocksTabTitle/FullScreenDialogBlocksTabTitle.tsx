import { cn, createStyles } from '@/utils';
import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { FC } from 'react';



const styles = createStyles({
    base: 'mb-5 text-20-24 font-semibold text-color-primary',
});

export const FullScreenDialogBlocksTabTitle: FC<
    RT.PropsWithChildrenAndClassName
> = ({
    className = '',
    children,
}) => {
    return (
        <div className={cn(styles.base, className)}>
            {children}
        </div>
    );
};