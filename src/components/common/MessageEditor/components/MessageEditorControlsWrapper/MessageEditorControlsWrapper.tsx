import { cn, createStyles } from '@/utils';
import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { FC } from 'react';



const styles = createStyles({
    wrapper: 'flex',
});

export const MessageEditorControlsWrapper: FC<
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