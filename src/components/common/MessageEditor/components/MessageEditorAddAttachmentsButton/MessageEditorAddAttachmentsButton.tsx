import { Inputs, Overlay, Sprite } from '@/components';
import { FC } from 'react';
import { sharedStyles } from '../../styles';
import { cn } from '@/utils';
import { ASSETS } from '@/generated/ASSETS';
import { useMessageEditorContext } from '../../hooks';
import { invariant } from '@lesnoypudge/utils';
import { ACCEPTED_FILE_TYPE } from '@/vars';
import { useTrans } from '@/hooks';
import { createWithDecorator, withDisplayName } from '@lesnoypudge/utils-react';
import { decorate } from '@lesnoypudge/macro';
import { useFileDrop } from './hooks';
import { FileDropDialog, OverflowLimitDialog, SizeLimitDialog } from './components';
import { FILE_MAX_SIZE } from '@/fakeShared';



const { withDecorator } = createWithDecorator(({ children }) => {
    const { t } = useTrans();
    const {
        attachmentsName,
        attachmentsAmountLimitControls,
        attachmentsSizeLimitIsControls,
    } = useMessageEditorContext();

    const errorMessage = 'Attachments not provided in MessageEditor';
    invariant(attachmentsName, errorMessage);
    invariant(attachmentsAmountLimitControls, errorMessage);
    invariant(attachmentsSizeLimitIsControls, errorMessage);

    return (
        <Inputs.FileInput.Provider
            name={attachmentsName}
            accept={ACCEPTED_FILE_TYPE.ALL}
            amountLimit={9}
            sizeLimit={FILE_MAX_SIZE}
            label={t('MessageEditor.AttachmentButton.label')}
            onAmountLimit={attachmentsAmountLimitControls.open}
            onSizeLimit={attachmentsSizeLimitIsControls.open}
        >
            {children}
        </Inputs.FileInput.Provider>
    );
});

decorate(withDisplayName, 'MessageEditorAddAttachmentsButton', decorate.target);
decorate(withDecorator, decorate.target);

export const MessageEditorAddAttachmentsButton: FC = () => {
    const controls = Overlay.useControls();
    const {
        attachmentsAmountLimitControls,
        attachmentsSizeLimitIsControls,
    } = useMessageEditorContext();

    useFileDrop({
        onDragEnd: controls.close,
        onDragStart: controls.open,
    });

    return (
        <>
            <Inputs.FileInput.Node className={cn(
                sharedStyles.stickyControl,
                sharedStyles.buttonWithIcon,
            )}>
                <Sprite
                    className={sharedStyles.buttonIcon}
                    sprite={ASSETS.IMAGES.SPRITE.ADD_FILE_ICON}
                />
            </Inputs.FileInput.Node>

            <FileDropDialog controls={controls}/>

            <OverflowLimitDialog controls={attachmentsAmountLimitControls}/>

            <SizeLimitDialog controls={attachmentsSizeLimitIsControls}/>
        </>
    );
};