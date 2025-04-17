import { MessageEditor, Placeholder } from '@/components';
import { FC } from 'react';
import { sharedStyles } from '../../styles';
import { RT } from '@lesnoypudge/types-utils-react/namespace';



export const MessageEditorPlaceholder: FC<RT.PropsWithClassName> = ({
    className = '',
}) => {
    return (
        <MessageEditor.PaddedWrapper className={className}>
            <Placeholder.Node className={sharedStyles.inner}/>
        </MessageEditor.PaddedWrapper>
    );
};