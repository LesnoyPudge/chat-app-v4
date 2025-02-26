import { T } from '@lesnoypudge/types-utils-base/namespace';
import { createWithDecorator, withDisplayName } from '@lesnoypudge/utils-react';



export const withDisplayNameAndDecorator = <
    _ExtraProps extends T.UnknownRecord,
>(
    displayName: string,
    Decorator: Parameters<typeof createWithDecorator<_ExtraProps>>[0],
): ReturnType<typeof createWithDecorator<_ExtraProps>> => {
    const { withDecorator } = createWithDecorator<_ExtraProps>(Decorator);

    const combined: typeof withDecorator = (component) => {
        return withDisplayName(displayName, withDecorator(component));
    };

    return {
        withDecorator: combined,
    };
};