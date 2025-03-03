import { Heading } from '@libs';
import { PropsWithChildrenAndClassName } from '@/types';
import { cn } from '@/utils';
import { FC } from 'react';



const styles = {
    base: 'text-xs uppercase mb-2 text-color-secondary',
};

export const SettingsGroupTitle: FC<PropsWithChildrenAndClassName> = ({
    className = '',
    children,
}) => {
    return (
        <Heading className={cn(styles.base, className)}>
            {children}
        </Heading>
    );
};