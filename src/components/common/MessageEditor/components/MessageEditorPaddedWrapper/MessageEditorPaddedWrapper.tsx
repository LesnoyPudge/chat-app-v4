import { cn, createStyles } from '@/utils';
import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { FC } from 'react';



const styles = createStyles({
    wrapper: 'px-4 pb-6 pt-4',
});

export const MessageEditorPaddedWrapper: FC<
    RT.PropsWithChildrenAndClassName
> = ({
    className = '',
    children,
}) => {
    return (
        <div className={cn(styles.wrapper, className)}>
            {children}
        </div>
    );
};