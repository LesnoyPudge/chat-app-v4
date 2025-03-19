import { T } from '@lesnoypudge/types-utils-base/namespace';
import { withDisplayName } from '@lesnoypudge/utils-react';
import { memo } from 'react';



export const withDisplayNameAndMemo = <_Component extends T.AnyFunction>(
    displayName: string,
    Component: _Component,
) => {
    return withDisplayName(displayName, memo(Component));
};