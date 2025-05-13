import { cn, createStyles } from '@/utils';
import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { Heading } from '@lesnoypudge/utils-react';
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
        <Heading.Node className={cn(styles.base, className)}>
            {children}
        </Heading.Node>
    );
};