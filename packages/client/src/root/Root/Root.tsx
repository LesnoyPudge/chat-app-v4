import {
    Heading,
    VisuallyHidden,
    ErrorBoundary,
    useRefManager,
    Focus,
    withDisplayName,
} from '@lesnoypudge/utils-react';
import { env, isDev } from '@vars';
import { lazy } from 'react';
import { GlobalProviders, Masks, SpriteSheet, Router } from './components';
import { ErrorScreen } from '@screens/bundled/ErrorScreen';
import { createWithDecorator, getHTMLElement } from '@utils';
import { GlobalLoader } from '@root/GlobalLoader';
import { usePreventDefault, useFocusTracker } from './hooks';



const appRoot = getHTMLElement.appRoot();

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
    const appRootRefManager = useRefManager(appRoot);

    usePreventDefault();
    // useFocusTracker();

    return (
        <>
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

            <Focus.Inside
                enabled
                containerRef={appRootRefManager}
            >
                <GlobalLoader.Wrapper>
                    <Router/>
                </GlobalLoader.Wrapper>
            </Focus.Inside>
        </>
    );
}));