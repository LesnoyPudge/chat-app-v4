import { T } from '@lesnoypudge/types-utils-base/namespace';



export const getSelectorName = (selector: T.AnyFunction) => {
    let displayName: string | undefined;

    if ('displayName' in selector) {
        displayName = String(selector.displayName);
    };

    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    return displayName || selector.name.trim() || 'unknown';
};