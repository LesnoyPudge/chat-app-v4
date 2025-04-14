import { ASSETS } from '@/generated/ASSETS';
import { ClientEntities } from '@/types';
import { FC } from 'react';
import { useMessageEditorContext } from '../../../../hooks';
import { Types } from '../../../../types';
import { Button, Form, Image, Inputs, Overlay, Sprite } from '@/components';
import { cn, createStyles, getAssetUrl } from '@/utils';
import { invariant } from '@lesnoypudge/utils';
import { useFunction, useRefManager } from '@lesnoypudge/utils-react';
import { useTrans } from '@/hooks';



const styles = createStyles({
    item: `
        relative 
        flex 
        size-[216px] 
        shrink-0 
        flex-col 
        gap-2 
        bg-primary-300 
        p-2
    `,
    buttonWrapper: `
        absolute 
        right-0 
        top-0 
        translate-x-[25%] 
        translate-y-[-25%] 
        shadow-elevation-low
    `,
    button: `
        size-8 
        rounded-md 
        bg-primary-400 
        p-1.5 
        hover-focus-visible:bg-primary-200 
    `,
    icon: 'size-full fill-danger',
    imageWrapper: `
        flex 
        flex-1 
        items-center 
        justify-center 
        overflow-hidden
    `,
    image: 'm-auto h-auto max-h-full w-auto object-contain',
    imageAsIcon: 'h-[96px] w-[72px]',
    fileName: 'truncate text-sm',
});

export namespace MessageEditorAttachmentItem {
    export type Props = (
        {
            index: number;
        } & ClientEntities.File.Encoded
    );
}

export const MessageEditorAttachmentItem: FC<
    MessageEditorAttachmentItem.Props
> = ({
    index,
    ...file
}) => {
    const { t } = useTrans();
    const deleteButtonRef = useRefManager<HTMLButtonElement>(null);
    const { attachmentsName } = useMessageEditorContext();
    const field = Form.useFieldApi<Types.MessageAttachments>(attachmentsName);

    const { removeOne } = Inputs.FileInput.useControls(field.setValue);

    const isFileAnImage = file.type.includes('image');

    const src = (
        isFileAnImage
            ? file.base64
            : getAssetUrl(ASSETS.IMAGES.COMMON.FILE_TEXT_IMAGE)
    );

    const handleClick = useFunction(() => {
        removeOne(index);
    });

    return (
        <li className={styles.item}>
            <div className={styles.buttonWrapper}>
                <Button
                    className={styles.button}
                    label={t('MessageEditor.RemoveAttachmentButton.label')}
                    innerRef={deleteButtonRef}
                    onLeftClick={handleClick}
                >
                    <Sprite
                        className={styles.icon}
                        sprite={ASSETS.IMAGES.SPRITE.GARBAGE_CAN_ICON}
                    />
                </Button>

                <Overlay.Tooltip
                    preferredAlignment='top'
                    leaderElementRef={deleteButtonRef}
                >
                    {t('MessageEditor.RemoveAttachmentButton.label')}
                </Overlay.Tooltip>
            </div>

            <div className={styles.imageWrapper}>
                <Image
                    className={cn(
                        styles.image,
                        !isFileAnImage && styles.imageAsIcon,
                    )}
                    alt={file.name}
                    src={src}
                />
            </div>

            <div className={styles.fileName}>
                {file.name}
            </div>
        </li>
    );
};