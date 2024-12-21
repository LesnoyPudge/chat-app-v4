import {
    Heading,
    VisuallyHidden,
    ErrorBoundary,
    useRefManager,
    Focus,
} from '@lesnoypudge/utils-react';
import { env, isDev } from '@vars';
import { FC, lazy } from 'react';
import { GlobalProviders, Masks, SpriteSheet, Router } from './components';
import { ErrorScreen } from '@pages/screens/ErrorScreen';
import { getHTMLElement } from '@utils';



const appRoot = getHTMLElement.appRoot();

const DevTools = lazy(() => import('./components/DevTools'));

export const Root: FC = () => {
    const appRootRefManager = useRefManager(appRoot);

    return (
        <ErrorBoundary.Node FallbackComponent={ErrorScreen}>
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
                <GlobalProviders>
                    <Router/>
                </GlobalProviders>
            </Focus.Inside>
        </ErrorBoundary.Node>
    );
};