import { FC, useMemo } from 'react';
import { Image } from '@components';
import { cn, createStyles } from '@utils';
import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { EmojiStore } from '@features';



const styles = createStyles({
    base: 'inline-block h-6 w-6 shrink-0 object-contain',
});

export namespace Emoji {
    export type Props = (
        RT.PropsWithClassName
        & {
            code: EmojiStore.EmojiCodeWithAliases;
        }
    );
};

export const Emoji: FC<Emoji.Props> = ({
    className = '',
    code,
}) => {
    const emoji = useMemo(() => EmojiStore.findEmoji(code), [code]);

    return (
        <Image
            className={cn(styles.base, className)}
            src={emoji.path}
            alt={emoji.code}
            lazy
        />
    );
};