import { C, T } from '@root';



export type EmojiCode = keyof typeof C.EmojiRecord;

export type EmojiAlias = Extract<(
    typeof C.EmojiRecord extends Record<string, {
        code: string;
        aliases: infer _Aliases;
    }> ? T.ValueOf<_Aliases> : never
), string>;