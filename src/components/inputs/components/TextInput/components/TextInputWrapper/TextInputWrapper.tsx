import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { cn, createStyles } from '@/utils';
import { FC } from 'react';



const styles = createStyles({
    wrapper: 'flex h-10 w-full rounded bg-primary-500',
});

export const TextInputWrapper: FC<RT.PropsWithChildrenAndClassName> = ({
    className = '',
    children,
}) => {
    return (
        <div className={cn(styles.wrapper, className)}>
            {children}
        </div>
    );
};