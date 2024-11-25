import { T } from '@lesnoypudge/types-utils-base/namespace';
import { invariant } from '@lesnoypudge/utils';
import { ToOneLine, toOneLine } from '@utils';



const process = (obj: object) => {
    return Object.fromEntries(
        Object.entries(obj).map(([key, value]) => {
            return [key, processValue(value)];
        }),
    );
};

const processValue = (
    objOrString: unknown,
): string | T.UnknownRecord => {
    if (typeof objOrString === 'string') {
        return toOneLine(objOrString);
    }

    if (typeof objOrString !== 'object' || objOrString === null) {
        invariant(false, 'passed wrong value to createStyles');
    }

    return process(objOrString);
};

type Processed<_Styles extends T.UnknownRecord> = {
    [_Key in keyof _Styles]: (
        _Styles[_Key] extends infer _Value extends string
            ? ToOneLine<_Value>
            : _Styles[_Key] extends infer _Value extends T.UnknownRecord
                ? T.Simplify<Processed<_Value>>
                : never
    )
};

type Return<_Styles extends T.UnknownRecord> = (
    T.Writable<
        T.Simplify<
            Processed<_Styles>
        >
    >
);

export const createStyles = <
    const _Styles extends T.UnknownRecord,
>(
    styles: _Styles,
) => {
    return process(styles) as Return<_Styles>;
};