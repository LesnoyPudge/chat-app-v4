import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { cn, createStyles } from '@utils';
import { FC } from 'react';



const styles = createStyles({
    base: 'text-center text-color-secondary',
});

export const BaseModalSubtitle: FC<RT.PropsWithChildrenAndClassName> = ({
    className = '',
    children,
}) => {
    return (
        <div className={cn(styles.base, className)}>
            {children}
        </div>
    );
};