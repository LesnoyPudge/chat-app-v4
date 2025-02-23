import {
    ErrorBoundary,
    withDisplayName,
    Focus,
    createWithDecorator,
} from '@lesnoypudge/utils-react';
import { isDev } from '@vars';
import { GlobalProviders, Masks, SpriteSheet, Router } from './components';
import { ErrorScreen } from '@screens/bundled';
import { GlobalLoader } from '@root/Root/components/GlobalLoader';
import {
    usePreventDefault,
    // useFocusTracker,
} from './hooks';



const DevTools = (
    isDev
        ? await import('./components/DevTools').then((v) => v.DevTools)
        : () => null
);

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

            <DevTools/>

            <GlobalLoader.Wrapper>
                <Router/>
            </GlobalLoader.Wrapper>
        </Focus.Lock>
    );
}));