import {
    Heading,
    VisuallyHidden,
    ErrorBoundary,
} from '@lesnoypudge/utils-react';
import { env } from '@vars';
import { FC, StrictMode } from 'react';
import { GlobalProviders, Masks, SpriteSheet } from '@root/components';
import { ErrorScreen } from '@pages/screens/ErrorScreen';
import { Router } from '@router/Router';



export const Root: FC = () => {
    return (
        <StrictMode>
            <ErrorBoundary.Node FallbackComponent={ErrorScreen}>
                <VisuallyHidden>
                    <Heading.Node>
                        {env._PUBLIC_APP_NAME}
                    </Heading.Node>
                </VisuallyHidden>

                <Masks/>

                <SpriteSheet/>

                <GlobalProviders>
                    <Router/>
                </GlobalProviders>
            </ErrorBoundary.Node>
        </StrictMode>
    );
};