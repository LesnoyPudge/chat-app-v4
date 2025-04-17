/* eslint-disable jsx-a11y/no-static-element-interactions */
import { createWithDecorator, useFunction } from '@lesnoypudge/utils-react';
import { Button, DialogBlocks, ExternalLink, Image, Overlay } from '@/components';
import { useTrans } from '@/hooks';
import { createStyles } from '@/utils';
import { MouseEvent } from 'react';



const {
    withDecorator,
} = createWithDecorator<DialogBlocks.Types.PublicProps>(({
    controls,
    children,
}) => {
    const { t } = useTrans();

    return (
        <DialogBlocks.Base.Provider
            controls={controls}
            label={t('Message.Attachments.ImagePreviewDialog.label')}
        >
            {children}
        </DialogBlocks.Base.Provider>
    );
});

const styles = createStyles({
    content: 'max-h-[calc(100dvh-40px)] max-w-[calc(100dvw-40px)]',
    image: 'max-h-[calc(100dvh-40px-48px)]',
    originalLink: 'text-sm',
    footer: 'h-12 justify-between gap-4 p-2',
});

export namespace ImagePreviewDialog {
    export type Props = {
        src: string;
    };
};

export const ImagePreviewDialog = withDecorator<ImagePreviewDialog.Props>(({
    src,
}) => {
    const { t } = useTrans();
    const { closeOverlay } = Overlay.Dialog.useContext();

    const stopPropagation = useFunction((e: MouseEvent) => {
        e.stopPropagation();
    });

    return (
        <DialogBlocks.Base.Wrapper>
            <DialogBlocks.Base.Content className={styles.content}>
                <div onContextMenu={stopPropagation}>
                    <Image
                        className={styles.image}
                        src={src}
                    />
                </div>
            </DialogBlocks.Base.Content>

            <DialogBlocks.Base.Footer className={styles.footer}>
                <ExternalLink
                    className={styles.originalLink}
                    href={src}
                >
                    {t('Message.Attachments.ImagePreviewDialog.openOriginalLink.text')}
                </ExternalLink>

                <Button
                    stylingPreset='lite'
                    size='small'
                    onLeftClick={closeOverlay}
                >
                    {t('COMMON.Close')}
                </Button>
            </DialogBlocks.Base.Footer>
        </DialogBlocks.Base.Wrapper>
    );
});