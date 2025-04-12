import { EmojiStore } from '@/features';
import { useFunction } from '@lesnoypudge/utils-react';
import { FC } from 'react';
import { Button, Emoji } from '@/components';
import { createStyles } from '@/utils';



const styles = createStyles({
    emojiListButton: `
        flex 
        size-10 
        rounded-lg
        transition-all 
        duration-75
        hover-focus-visible:bg-primary-100 
    `,
    emojiListEmoji: 'm-auto h-8',
});

export namespace EmojiListItem {
    export type Props = {
        code: EmojiStore.EmojiCode;
        pickEmoji: (code: EmojiStore.EmojiCode) => void;
        previewEmoji: (code: EmojiStore.EmojiCode) => void;
    };
}

export const EmojiListItem: FC<EmojiListItem.Props> = ({
    code,
    pickEmoji,
    previewEmoji,
}) => {
    const emoji = EmojiStore.findEmoji(code);

    const changeCurrentEmoji = useFunction(() => {
        previewEmoji(code);
    });

    const handleClick = useFunction(() => {
        pickEmoji(code);
    });

    return (
        <li>
            <Button
                className={styles.emojiListButton}
                label={emoji.code}
                onLeftClick={handleClick}
                onMouseEnter={changeCurrentEmoji}
                onFocus={changeCurrentEmoji}
            >
                <Emoji
                    className={styles.emojiListEmoji}
                    code={code}
                />
            </Button>
        </li>
    );
};