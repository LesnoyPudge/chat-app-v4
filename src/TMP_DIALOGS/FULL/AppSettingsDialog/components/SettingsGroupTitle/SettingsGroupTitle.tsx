import { cn, createStyles } from '@/utils';
import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { Heading } from '@lesnoypudge/utils-react';
import { FC } from 'react';



const styles = createStyles({
    base: 'mb-2 text-xs uppercase text-color-secondary',
});

export const SettingsGroupTitle: FC<RT.PropsWithChildrenAndClassName> = ({
    className = '',
    children,
}) => {
    return (
        <Heading.Node className={cn(styles.base, className)}>
            {children}
        </Heading.Node>
    );
};