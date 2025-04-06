import { cn, createStyles } from '@/utils';
import { Scrollable } from '@/components';
import { FC } from 'react';
import { RT } from '@lesnoypudge/types-utils-react/namespace';



const styles = createStyles({
    sizeLimit: 'max-h-[50dvh]',
});

export const MessageEditorScroll: FC<RT.PropsWithChildrenAndClassName> = ({
    className = '',
    children,
}) => {
    return (
        <Scrollable
            className={cn(styles.sizeLimit, className)}
            autoHide
            size='small'
        >
            {children}
        </Scrollable>
    );
};