


type EmojiRecord = Record<string, {
    code: string;
    aliases: string[];
}>;

// https://unicode.org/emoji/charts/full-emoji-list.html
export const EmojiRecord = {
    ':poop:': {
        code: ':poop:',
        aliases: [
            ':poop:',
            ':shit:',
            ':crap:',
        ],
    },
    ':smile:': {
        code: ':smile:',
        aliases: [
            ':smile:',
            ':):',
            ':=):',
            ':=-):',
            '::):',
            '::-):',
        ],
    },
    ':thumbs_up:': {
        code: ':thumbs_up:',
        aliases: [
            ':thumbs_up:',
            ':+1:',
        ],
    },
    ':thumbs_down:': {
        code: ':thumbs_down:',
        aliases: [
            ':thumbs_down:',
            ':-1:',
        ],
    },
    ':ok:': {
        code: ':ok:',
        aliases: [
            ':ok:',
            ':ok_hand:',
        ],
    },
} as const;