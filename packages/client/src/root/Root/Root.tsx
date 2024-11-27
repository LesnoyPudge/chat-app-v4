import { Heading, VisuallyHidden } from '@lesnoypudge/utils-react';
import { env } from '@vars';
import { FC, StrictMode } from 'react';
import { Masks, Sprite } from '@root/components';
import { never } from '@lesnoypudge/utils';
import { ErrorBoundary } from '@components';
import { ErrorPage } from '@pages/ErrorPage';

const ErrorComp: FC = () => {
    never();
};

export const Root: FC = () => {
    return (
        <StrictMode>
            <ErrorBoundary FallbackComponent={ErrorPage}>
                <Heading.Provider>
                    <VisuallyHidden>
                        <Heading.Node>
                            {env._PUBLIC_APP_NAME}
                        </Heading.Node>
                    </VisuallyHidden>

                    <Masks/>
                    <ErrorComp/>
                    <Sprite/>
                </Heading.Provider>
            </ErrorBoundary>
        </StrictMode>
    );
};