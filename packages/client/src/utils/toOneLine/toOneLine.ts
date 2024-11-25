import { T } from '@lesnoypudge/types-utils-base/namespace';



type TrimLoop<_Arr extends string[]> = _Arr[1] extends undefined
    ? [T.Trim<_Arr[0]>]
    : [T.Trim<_Arr[0]>, ...TrimLoop<T.ArrayTail<_Arr>>]
;

export type ToOneLine<_Text extends string> = (
    TrimLoop<
        T.Split<_Text, '\n'>
    > extends [...infer _Arr extends string[]]
        ? T.Trim<T.Join<_Arr, ' '>>
        : never
);

export const toOneLine = <_Text extends string>(
    text: _Text,
) => {
    return (
        text
            .split(/\r?\n/)
            .map((item) => item.trim())
            .join(' ')
            .trim()
    ) as ToOneLine<_Text>;
};