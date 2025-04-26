import {
    ControllableStrictMode,
    ErrorBoundary,
    Focus,
    Heading,
} from '@lesnoypudge/utils-react';
import { FLAGS, isDev } from '@/vars';
import {
    GlobalLoader,
    GlobalProviders,
} from './components';
import { ErrorScreen } from '@/router/screens/bundled';
import { useDebug, usePreventDefault, useHTMLVars } from './hooks';
import { Router } from '@/router';
import { FC } from 'react';



const DevTools = (
    isDev
        ? await import('./components/DevTools').then((v) => v.DevTools)
        : () => null
);

export const Root: FC = () => {
    useHTMLVars();
    useDebug();
    usePreventDefault();

    return (
        <ControllableStrictMode
            isEnabled={FLAGS.GENERAL.ENABLE_REACT_STRICT_MODE}
        >
            <Focus.Lock
                autoFocus
                enabled
                scrollLock={false}
                noIsolation
            >
                <Heading.Provider>
                    <ErrorBoundary.Node FallbackComponent={ErrorScreen}>
                        <GlobalProviders>
                            <GlobalLoader.Wrapper>
                                <Router/>
                            </GlobalLoader.Wrapper>
                        </GlobalProviders>
                    </ErrorBoundary.Node>
                </Heading.Provider>

                <DevTools/>
            </Focus.Lock>
        </ControllableStrictMode>
    );
};