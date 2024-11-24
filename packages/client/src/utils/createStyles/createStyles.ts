import { T } from '@lesnoypudge/types-utils-base/namespace';
import { invariant } from '@lesnoypudge/utils';
import { toOneLine } from '@utils';



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

export const createStyles = <
    _Styles extends T.UnknownRecord,
>(
    styles: _Styles,
) => {
    return process(styles) as _Styles;
};