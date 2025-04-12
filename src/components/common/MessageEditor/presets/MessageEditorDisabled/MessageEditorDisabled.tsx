import { FC } from 'react';
import { sharedStyles } from '../../styles';
import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { cn, createStyles } from '@/utils';



const styles = createStyles({
    inner: `
        grid 
        cursor-not-allowed 
        select-none
        place-content-center 
        truncate 
        opacity-60
    `,
});

export const MessageEditorDisabled: FC<RT.PropsWithChildrenAndClassName> = ({
    className = '',
    children,
}) => {
    return (
        <div className={cn(sharedStyles.wrapper, className)}>
            <div className={cn(sharedStyles.inner, styles.inner)}>
                {children}
            </div>
        </div>
    );
};