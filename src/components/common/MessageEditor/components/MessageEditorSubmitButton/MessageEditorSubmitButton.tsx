import { Button, Sprite } from '@/components';
import { cn } from '@/utils';
import { FC } from 'react';
import { sharedStyles } from '../../styles';
import { ASSETS } from '@/generated/ASSETS';
import { useMessageEditorContext } from '../../hooks';



export const MessageEditorSubmitButton: FC = () => {
    const {
        isSubmitting,
        submitButtonLabel,
        submit,
    } = useMessageEditorContext();

    return (
        <Button
            className={cn(sharedStyles.buttonWithIcon, sharedStyles.stickyControl)}
            type='submit'
            label={submitButtonLabel}
            isLoading={isSubmitting}
            onLeftClick={submit}
        >
            <Sprite
                className={sharedStyles.buttonIcon}
                sprite={ASSETS.IMAGES.SPRITE.SEND_MESSAGE_ICON}
            />
        </Button>
    );
};