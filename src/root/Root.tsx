import {
    ControllableStrictMode,
    createWithDecorator,
    ErrorBoundary,
    Focus,
    withDisplayName,
} from '@lesnoypudge/utils-react';
import { isDev } from '@/vars';
import {
    GlobalProviders,
    Masks,
    SpriteSheet,
    GlobalLoader,
} from './components';
import { ErrorScreen } from '@/router/screens/bundled';
import { useDebug, usePreventDefault, useHTMLVars } from './hooks';
import { Router } from '@/router';
import { decorate } from '@lesnoypudge/macro';
import { FC } from 'react';



const DevTools = (
    isDev
        ? await import('./components/DevTools').then((v) => v.DevTools)
        : () => null
);

const { withDecorator } = createWithDecorator(({ children }) => {
    return (
        <ControllableStrictMode isEnabled={false}>
            <ErrorBoundary.Node FallbackComponent={ErrorScreen}>
                <GlobalProviders>
                    {children}
                </GlobalProviders>
            </ErrorBoundary.Node>
        </ControllableStrictMode>
    );
});

decorate(withDisplayName, 'Root', decorate.target);
decorate(withDecorator, decorate.target);

export const Root: FC = () => {
    useHTMLVars();
    useDebug();
    usePreventDefault();

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
};