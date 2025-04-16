import { Emoji, Scrollable, SearchBar } from '@/components';
import { EmojiStore } from '@/features';
import { useTrans } from '@/hooks';
import { cn, createStyles } from '@/utils';
import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { inRange, invariant } from '@lesnoypudge/utils';
import { Iterate } from '@lesnoypudge/utils-react';
import { FC, useMemo, useState } from 'react';
import { EmojiListItem } from './components';



const styles = createStyles({
    wrapper: `
        pointer-events-auto 
        flex 
        h-[min(300px,100dvh)] 
        w-[min(300px,100dvw)] 
        flex-col 
        rounded-md 
        bg-primary-400
        shadow-elevation-high
    `,
    scrollable: 'my-3 h-full',
    emojiList: ` 
        grid 
        h-full
        auto-rows-max 
        grid-cols-5
        justify-center 
        gap-3 
        py-2
    `,
    notFound: `
        flex 
        h-full 
        items-center 
        justify-center 
        text-sm 
        font-medium
    `,
    searchBar: 'm-3 h-[30px] w-auto',
    previewWrapper: 'flex h-12 items-center bg-primary-500 px-2',
    previewEmoji: 'mr-2 size-7',
    previewText: 'truncate font-bold',
});

export namespace EmojiPicker {
    export type OnEmojiPick = (code: EmojiStore.EmojiCode) => void;

    export type Props = (
        RT.PropsWithClassName
        & {
            onEmojiPick: OnEmojiPick;
        }
    );
}

export const EmojiPicker: FC<EmojiPicker.Props> = ({
    className = '',
    onEmojiPick,
}) => {
    const { t } = useTrans();
    const search = SearchBar.useControls();
    const [
        currentEmojiCode,
        setCurrentEmojiCode,
    ] = useState(() => {
        const emoji = EmojiStore.emojis[inRange(
            0,
            EmojiStore.emojis.length - 1,
        )];
        invariant(emoji);

        return emoji.code;
    });

    const currentEmoji = EmojiStore.findEmoji(currentEmojiCode);

    const filteredList = useMemo(() => {
        return EmojiStore.emojis.filter((emoji) => {
            return (
                emoji.code.includes(search.deferredValue)
                || emoji.aliases.some((code) => {
                    return code.includes(search.deferredValue);
                })
            );
        });
    }, [search.deferredValue]);

    const emojiListToShow = (
        search.deferredValue
            ? filteredList
            : EmojiStore.emojis
    );

    const emojiCode = currentEmoji.code;
    const emojiAliases = currentEmoji.aliases.join(' ');
    const shouldShowList = !!emojiListToShow.length;

    return (
        <div className={cn(styles.wrapper, className)}>
            <SearchBar.Node
                className={styles.searchBar}
                label={t('EmojiPicker.searchBar.label')}
                placeholder={emojiAliases}
                setValue={search.setValue}
                value={search.value}
            />

            <If condition={shouldShowList}>
                <Scrollable className={styles.scrollable}>
                    <ul className={styles.emojiList}>
                        <Iterate
                            items={emojiListToShow}
                            getKey={(v) => v.code}
                        >
                            {(emoji) => (
                                <EmojiListItem
                                    code={emoji.code}
                                    pickEmoji={onEmojiPick}
                                    previewEmoji={setCurrentEmojiCode}
                                />
                            )}
                        </Iterate>
                    </ul>
                </Scrollable>
            </If>

            <If condition={!shouldShowList}>
                <div className={styles.notFound}>
                    <span>{t('EmojiPicker.notFound')}</span>
                </div>
            </If>

            <div className={styles.previewWrapper}>
                <Emoji
                    className={styles.previewEmoji}
                    code={emojiCode}
                />

                <span className={styles.previewText}>
                    {emojiAliases}
                </span>
            </div>
        </div>
    );
};