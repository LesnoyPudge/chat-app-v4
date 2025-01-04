import {
    Heading,
    VisuallyHidden,
    ErrorBoundary,
    withDisplayName,
    Focus,
} from '@lesnoypudge/utils-react';
import { env, isDev } from '@vars';
import { lazy } from 'react';
import { GlobalProviders, Masks, SpriteSheet, Router } from './components';
import { ErrorScreen } from '@screens/bundled';
import { createWithDecorator } from '@utils';
import { GlobalLoader } from '@root/GlobalLoader';
import {
    usePreventDefault,
    // useFocusTracker,
} from './hooks';



const DevTools = lazy(() => import('./components/DevTools'));

const decorated = createWithDecorator(({ children }) => {
    return (
        <ErrorBoundary.Node FallbackComponent={ErrorScreen}>
            <GlobalProviders>
                {children}
            </GlobalProviders>
        </ErrorBoundary.Node>
    );
});

export const Root = withDisplayName('Root', decorated(() => {
    usePreventDefault();
    // useFocusTracker();

    return (
        <Focus.Lock autoFocus enabled noIsolation>
            <VisuallyHidden>
                <Heading.Node>
                    {env._PUBLIC_APP_NAME}
                </Heading.Node>
            </VisuallyHidden>

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