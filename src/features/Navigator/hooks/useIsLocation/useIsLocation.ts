import { ContextSelectable } from '@lesnoypudge/utils-react';
import { NavigatorContext } from '../../context';
import { pathMatchers } from '../../vars';
import { T } from '@lesnoypudge/types-utils-base/namespace';



type Matchers = typeof pathMatchers;

type MatcherSelector = (
    matchers: Matchers
) => ReturnType<T.ValueOf<Matchers>>;

export const useIsLocation = (
    pathOrMatcher: string | MatcherSelector,
): boolean => {
    const isActiveLocation = ContextSelectable.useSelector(
        NavigatorContext,
        (v) => {
            if (typeof pathOrMatcher === 'string') {
                return v.pathname === pathOrMatcher;
            }

            return pathOrMatcher(pathMatchers)(v.pathname);
        },
    );

    return isActiveLocation;
};