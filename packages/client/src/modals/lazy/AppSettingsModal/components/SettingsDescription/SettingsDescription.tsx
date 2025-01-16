import { PropsWithChildrenAndClassName } from '@types';
import { cn } from '@utils';
import { FC } from 'react';



const styles = {
    base: 'text-color-secondary text-sm',
};

export const SettingsDescription: FC<PropsWithChildrenAndClassName> = ({
    className = '',
    children,
}) => {
    return (
        <p className={cn(styles.base, className)}>
            {children}
        </p>
    );
};