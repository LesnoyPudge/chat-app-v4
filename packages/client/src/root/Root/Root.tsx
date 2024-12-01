import {
    Heading,
    VisuallyHidden,
    ErrorBoundary,
    MoveFocusInside,
    useRefManager,
} from '@lesnoypudge/utils-react';
import { env } from '@vars';
import { FC } from 'react';
import { GlobalProviders, Masks, SpriteSheet } from '@root/components';
import { ErrorScreen } from '@pages/screens/ErrorScreen';
import { Router } from '@root/router/Router';
import { getHTMLElement } from '@utils';



const appRoot = getHTMLElement.appRoot();

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

            <GlobalProviders>
                <MoveFocusInside
                    enabled
                    forced
                    containerRef={appRootRefManager}
                >
                    <Router/>
                </MoveFocusInside>
            </GlobalProviders>
        </ErrorBoundary.Node>
    );
};