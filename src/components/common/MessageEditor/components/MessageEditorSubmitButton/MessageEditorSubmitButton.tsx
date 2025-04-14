import { Button, Form, Sprite } from '@/components';
import { cn } from '@/utils';
import { FC } from 'react';
import { sharedStyles } from '../../styles';
import { ASSETS } from '@/generated/ASSETS';
import { useMessageEditorContext } from '../../hooks';



export const MessageEditorSubmitButton: FC = () => {
    const {
        submitButtonLabel,
    } = useMessageEditorContext();

    return (
        <Form.SubmitButton
            className={cn(sharedStyles.buttonWithIcon, sharedStyles.stickyControl)}
            label={submitButtonLabel}
        >
            <Sprite
                className={sharedStyles.buttonIcon}
                sprite={ASSETS.IMAGES.SPRITE.SEND_MESSAGE_ICON}
            />
        </Form.SubmitButton>
    );
};