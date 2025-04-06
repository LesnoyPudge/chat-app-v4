import { createStyles } from '@/utils';
import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { FC } from 'react';
import { Form, Scrollable } from '@/components';
import { useMessageEditorContext } from '../../hooks';



const styles = createStyles({
    scrollable: 'h-full',
    list: 'flex flex-1 gap-6 py-5',
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

export const MessageEditorAttachments: FC<RT.PropsWithClassName> = ({
    className = '',
}) => {
    const { attachmentsControls } = useMessageEditorContext();
    attachmentsControls.field;
    Form.useField();

    const attachments = value.filter(Boolean);

    if (!attachments.length) return null;

    return (
        <div className={className}>
            <Scrollable
                className={styles.scrollable}
                direction='horizontal'
            >
                <ul className={styles.list}>
                    <List list={attachments}>
                        {(file, index) => {
                            const fileIsImage = file.type.includes('image');
                            const imageProps = {
                                src: fileIsImage ? null : IMAGES.COMMON.FILE_TEXT_IMAGE.PATH,
                                file: fileIsImage ? file : null,
                            };
                            const handleClick = () => removeFile(index);

                            return (
                                <li className={styles.item}>
                                    <div className={styles.buttonWrapper}>
                                        <Ref<HTMLButtonElement>>
                                            {(ref) => (
                                                <>
                                                    <Button
                                                        className={styles.button}
                                                        label='Удалить вложение'
                                                        innerRef={ref}
                                                        onLeftClick={handleClick}
                                                    >
                                                        <SpriteImage
                                                            className={styles.icon}
                                                            name='GARBAGE_CAN_ICON'
                                                        />
                                                    </Button>

                                                    <Tooltip
                                                        preferredAlignment='top'
                                                        leaderElementRef={ref}
                                                    >
                                                        <>Удалить вложение</>
                                                    </Tooltip>
                                                </>
                                            )}
                                        </Ref>
                                    </div>

                                    <div className={styles.imageWrapper}>
                                        <Image
                                            className={cn(
                                                styles.image,
                                                { [styles.imageAsIcon]: !fileIsImage },
                                            )}
                                            alt={`Вложение ${file.name}`}
                                            {...imageProps}
                                        />
                                    </div>

                                    <div className={styles.fileName}>
                                        {file.name}
                                    </div>
                                </li>
                            );
                        }}
                    </List>
                </ul>
            </Scrollable>
        </div>
    );
};