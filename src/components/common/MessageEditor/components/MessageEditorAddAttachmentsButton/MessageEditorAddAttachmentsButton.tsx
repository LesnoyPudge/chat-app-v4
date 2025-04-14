import { Inputs, Overlay, Sprite } from '@/components';
import { FC } from 'react';
import { sharedStyles } from '../../styles';
import { cn } from '@/utils';
import { ASSETS } from '@/generated/ASSETS';
import { useMessageEditorContext } from '../../hooks';
import { ACCEPTED_FILE_TYPE } from '@/vars';
import { useTrans } from '@/hooks';
import { useFileDrop } from './hooks';
import { FileDropDialog, OverflowLimitDialog, SizeLimitDialog } from './components';
import { FILE_MAX_SIZE_BYTES } from '@/fakeShared';



const DragOverlayTrigger: FC<Overlay.Types.WithControls> = ({
    controls,
}) => {
    useFileDrop({
        onDragEnd: controls.close,
        onDragStart: controls.open,
    });

    return null;
};

export const MessageEditorAddAttachmentsButton: FC = () => {
    const fileDropDialogControls = Overlay.useControls();
    const attachmentsAmountLimitControls = Overlay.useControls();
    const attachmentsSizeLimitIsControls = Overlay.useControls();

    const { t } = useTrans();
    const { attachmentsName } = useMessageEditorContext();

    return (
        <Inputs.FileInput.Provider
            name={attachmentsName}
            accept={ACCEPTED_FILE_TYPE.ALL}
            amountLimit={9}
            sizeLimit={FILE_MAX_SIZE_BYTES}
            label={t('MessageEditor.AddAttachmentsButton.label')}
            onAmountLimit={attachmentsAmountLimitControls.open}
            onSizeLimit={attachmentsSizeLimitIsControls.open}
        >
            <DragOverlayTrigger controls={fileDropDialogControls}/>

            <Inputs.FileInput.Node className={cn(
                sharedStyles.stickyControl,
                sharedStyles.buttonWithIcon,
            )}>
                <Sprite
                    className={sharedStyles.buttonIcon}
                    sprite={ASSETS.IMAGES.SPRITE.ADD_FILE_ICON}
                />
            </Inputs.FileInput.Node>

            <FileDropDialog controls={fileDropDialogControls}/>

            <OverflowLimitDialog controls={attachmentsAmountLimitControls}/>

            <SizeLimitDialog controls={attachmentsSizeLimitIsControls}/>
        </Inputs.FileInput.Provider>
    );
};