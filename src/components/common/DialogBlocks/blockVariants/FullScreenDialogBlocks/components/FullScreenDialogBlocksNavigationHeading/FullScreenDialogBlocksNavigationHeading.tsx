import { cn, createStyles } from '@/utils';
import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { FC } from 'react';



const styles = createStyles({
    heading: `
        mb-1.5 
        truncate 
        px-2.5 
        text-xs 
        font-bold 
        uppercase 
        text-color-muted
    `,
});

export const FullScreenDialogBlocksNavigationHeading: FC<
    RT.PropsWithChildrenAndClassName
> = ({
    className = '',
    children,
}) => {
    return (
        <div className={cn(styles.heading, className)}>
            {children}
        </div>
    );
};