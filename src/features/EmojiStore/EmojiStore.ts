import { ASSETS } from '@/generated/ASSETS';
import { T } from '@lesnoypudge/types-utils-base/namespace';
import { invariant } from '@lesnoypudge/utils';
import { getAssetUrl } from '@/utils';



export namespace EmojiStore {
    export type Emoji = {
        code: string;
        path: string;
        aliases: string[];
    };

    // // https:// unicode.org/emoji/charts/full-emoji-list.html
    export const emojis = [
        {
            code: ':smile:',
            path: getAssetUrl(ASSETS.IMAGES.COMMON.SMILE),
            aliases: [],
        },
        {
            code: ':poop:',
            path: getAssetUrl(ASSETS.IMAGES.COMMON.POOP),
            aliases: [':shit:'],
        },
        {
            code: ':thumbs_up:',
            path: getAssetUrl(ASSETS.IMAGES.COMMON.THUMBS_UP),
            aliases: [],
        },
        {
            code: ':thumbs_down:',
            path: getAssetUrl(ASSETS.IMAGES.COMMON.THUMBS_DOWN),
            aliases: [],
        },
        {
            code: ':ok_hand:',
            path: getAssetUrl(ASSETS.IMAGES.COMMON.OK_HAND),
            aliases: [':ok:'],
        },
    ] as const satisfies Emoji[];

    type Emojis = typeof emojis;

    export const emojiCodes = emojis.map((emoji) => {
        return emoji.code;
    });

    export type EmojiCode = T.ArrayValues<typeof emojiCodes>;

    export type EmojiMap = (
        Emojis[number] extends infer _Emoji extends Emoji
            ? {
                    [_Key in _Emoji['code']]: (
                        _Emoji extends { code: _Key }
                            ? _Emoji
                            : never
                    )
                }
            : never
    );

    export const emojiMap = emojiCodes.reduce<EmojiMap>((acc, cur) => {
        const emoji = emojis.find((emoji) => emoji.code === cur);
        invariant(emoji);
        // @ts-expect-error
        acc[cur] = emoji;

        return acc;
    }, {});

    export const emojiCodeRegExp = new RegExp(emojiCodes.join('|'));

    const emojiCodesWithAliases = emojis.flatMap((emoji) => {
        return [emoji.code, ...emoji.aliases];
    });

    export type EmojiCodeWithAliases = T.ArrayValues<
        typeof emojiCodesWithAliases
    >;

    export const emojiCodeWithAliasesRegExp = new RegExp(
        emojiCodesWithAliases.join('|'),
    );

    type EmojiMatch = {
        emoji: Emoji;
        match: RegExpExecArray;
    };

    export const matchEmoji = (text: string): EmojiMatch | null => {
        const textToMatch = text.toLowerCase();

        const codeMatch = emojiCodeRegExp.exec(textToMatch);
        if (codeMatch) {
            const emoji = emojis.find((item) => {
                return (
                    item.code === codeMatch[0]
                    || item.aliases.includes(codeMatch[0])
                );
            });
            if (!emoji) return null;

            return {
                emoji,
                match: codeMatch,
            };
        }

        return null;
    };

    export const findEmoji = (code: EmojiCodeWithAliases) => {
        const emoji = emojis.find((item) => {
            return (
                item.code === code
                || item.aliases.includes(code)
            );
        });
        invariant(emoji);

        return emoji;
    };
}