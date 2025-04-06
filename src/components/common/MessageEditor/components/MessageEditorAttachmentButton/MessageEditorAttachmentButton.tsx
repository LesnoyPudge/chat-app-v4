import { Form, Sprite } from '@/components';
import { FC } from 'react';
import { sharedStyles } from '../../styles';
import { cn } from '@/utils';
import { ASSETS } from '@/generated/ASSETS';
import { useMessageEditorContext } from '../../hooks';



export const MessageEditorAttachmentButton: FC = () => {
    const { attachmentsControls } = useMessageEditorContext();

    return (
        <>
            <Form.Inputs.FileInput.Node
                className={cn(
                    sharedStyles.stickyControl,
                    sharedStyles.buttonWithIcon,
                )}
                accept={attachmentsControls.accept}
                amountLimit={attachmentsControls.amountLimit}
                label={attachmentsControls.label}
                field={attachmentsControls.field}
            >
                <Sprite
                    className={sharedStyles.buttonIcon}
                    sprite={ASSETS.IMAGES.SPRITE.ADD_FILE_ICON}
                />
            </Form.Inputs.FileInput.Node>
        </>
    );
};