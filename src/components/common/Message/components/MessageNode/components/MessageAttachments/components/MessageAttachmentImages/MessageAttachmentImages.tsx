import { Button, Image, Overlay } from '@/components';
import { Iterate } from '@lesnoypudge/utils-react';
import { FC } from 'react';
import { useMessageContext } from '../../../../../../hooks';
import { createStyles, getReadFilePath } from '@/utils';
import { ImagePreviewDialog } from './components';
import { useTrans } from '@/hooks';
import './MessageAttachmentImages.scss';



const styles = createStyles({
    item: 'rounded-sm',
    button: 'size-full',
});

type ItemProps = {
    id: string;
    index: number;
};

const Item: FC<ItemProps> = ({
    id,
    index,
}) => {
    const { tabIndex } = useMessageContext();
    const src = getReadFilePath(id);
    const controls = Overlay.useControls();

    return (
        <li
            className={styles.item}
            data-grid-item={index + 1}
        >
            <Button
                className={styles.button}
                tabIndex={tabIndex}
                hasPopup='dialog'
                onLeftClick={controls.open}
            >
                <Image src={src}/>
            </Button>

            <ImagePreviewDialog
                src={src}
                controls={controls}
            />
        </li>
    );
};

export const MessageAttachmentImages: FC = () => {
    const { t } = useTrans();
    const { message } = useMessageContext();

    const images = message.attachments.filter((v) => v.type === 'image');

    if (!images.length) return null;

    return (
        <ul
            // eslint-disable-next-line tailwindcss/no-custom-classname
            className='MessageAttachmentImages'
            aria-label={t('Message.Attachments.imageList.label')}
            data-grid-size={images.length}
        >
            <Iterate
                items={images}
                getKey={(v) => v.id}
            >
                {(image, index) => (
                    <Item
                        id={image.id}
                        index={index}
                    />
                )}
            </Iterate>
        </ul>
    );
};