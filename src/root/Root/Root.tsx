import {
    ErrorBoundary,
    withDisplayName,
    Focus,
    createWithDecorator,
} from '@lesnoypudge/utils-react';
import { isDev } from '@vars';
import { lazy } from 'react';
import { GlobalProviders, Masks, SpriteSheet, Router } from './components';
import { ErrorScreen } from '@screens/bundled';
import { GlobalLoader } from '@root/GlobalLoader';
import {
    usePreventDefault,
    // useFocusTracker,
} from './hooks';



const DevTools = lazy(() => import('./components/DevTools'));

const { withDecorator } = createWithDecorator(({ children }) => {
    return (
        <ErrorBoundary.Node FallbackComponent={ErrorScreen}>
            <GlobalProviders>
                {children}
            </GlobalProviders>
        </ErrorBoundary.Node>
    );
});

export const Root = withDisplayName('Root', withDecorator(() => {
    usePreventDefault();
    // useFocusTracker();

    return (
        <Focus.Lock autoFocus enabled noIsolation>
            <Masks/>

            <SpriteSheet/>

            <If condition={isDev}>
                <DevTools/>
            </If>

            <GlobalLoader.Wrapper>
                <Router/>
            </GlobalLoader.Wrapper>
        </Focus.Lock>
    );
}));