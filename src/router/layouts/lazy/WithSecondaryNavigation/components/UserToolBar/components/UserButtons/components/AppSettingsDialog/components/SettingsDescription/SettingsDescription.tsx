import { cn, createStyles } from '@/utils';
import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { FC } from 'react';



const styles = createStyles({
    base: 'text-sm text-color-secondary',
});

export const SettingsDescription: FC<RT.PropsWithChildrenAndClassName> = ({
    className = '',
    children,
}) => {
    return (
        <p className={cn(styles.base, className)}>
            {children}
        </p>
    );
};