import {
    ControllableStrictMode,
    ErrorBoundary,
    Focus,
} from '@lesnoypudge/utils-react';
import { isDev } from '@/vars';
import {
    GlobalProviders,
    Masks,
    SpriteSheet,
    GlobalLoader,
} from './components';
import { ErrorScreen } from '@/router/screens/bundled';
import {
    usePreventDefault,
    // useFocusTracker,
} from './hooks';
import { withDisplayNameAndDecorator } from '@/utils';
import { Router } from '@/router';



const DevTools = (
    isDev
        ? await import('./components/DevTools').then((v) => v.DevTools)
        : () => null
);

const { withDecorator } = withDisplayNameAndDecorator(
    'Root',
    ({ children }) => {
        return (
            <ControllableStrictMode isEnabled={false}>
                <ErrorBoundary.Node FallbackComponent={ErrorScreen}>
                    <GlobalProviders>
                        {children}
                    </GlobalProviders>
                </ErrorBoundary.Node>
            </ControllableStrictMode>
        );
    },
);

export const Root = withDecorator(() => {
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
});