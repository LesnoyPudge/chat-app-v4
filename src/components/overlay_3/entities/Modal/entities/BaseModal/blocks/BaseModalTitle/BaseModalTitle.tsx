import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { Heading } from '@lesnoypudge/utils-react';
import { cn } from '@utils';
import { FC } from 'react';



const styles = {
    base: 'text-2xl font-bold text-color-primary text-center',
};

export const BaseModalTitle: FC<RT.PropsWithChildrenAndClassName> = ({
    className = '',
    children,
}) => {
    return (
        <Heading.Node className={cn(styles.base, className)}>
            {children}
        </Heading.Node>
    );
};