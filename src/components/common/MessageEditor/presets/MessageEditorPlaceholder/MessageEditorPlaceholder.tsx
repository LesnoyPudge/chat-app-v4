import { Placeholder } from '@/components';
import { FC } from 'react';
import { sharedStyles } from '../../styles';
import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { cn } from '@/utils';



export const MessageEditorPlaceholder: FC<RT.PropsWithClassName> = ({
    className = '',
}) => {
    return (
        <div className={cn(sharedStyles.wrapper, className)}>
            <Placeholder.Node className={sharedStyles.inner}/>
        </div>
    );
};