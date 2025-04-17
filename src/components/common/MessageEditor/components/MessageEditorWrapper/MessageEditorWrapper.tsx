import { FC } from 'react';
import { sharedStyles } from '../../styles';
import { cn, createStyles } from '@/utils';
import { RT } from '@lesnoypudge/types-utils-react/namespace';



const styles = createStyles({
    inner: 'has-[[role=textbox]:focus-visible]:outline-focus',
});

export const MessageEditorWrapper: FC<RT.PropsWithChildrenAndClassName> = ({
    className = '',
    children,
}) => {
    return (
        <div className={className}>
            <div className={cn(sharedStyles.inner, styles.inner)}>
                {children}
            </div>
        </div>
    );
};