import {
    ControllableStrictMode,
    ErrorBoundary,
    Focus,
} from '@lesnoypudge/utils-react';
import { FLAGS, isDev } from '@/vars';
import { GlobalLoader, GlobalProviders } from './components';
import { ErrorScreen } from '@/router/screens/bundled';
import { usePreventDefault, useHTMLVars } from './hooks';
import { Router } from '@/router';
import { FC } from 'react';
import { noop } from '@lesnoypudge/utils';
import { T } from '@lesnoypudge/types-utils-base';



const useDebug = (
    isDev
        ? await import('./hooks/useDebug').then((v) => v.useDebug)
        : noop as T.AnyFunction
);

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
                <ErrorBoundary.Node FallbackComponent={ErrorScreen}>
                    <GlobalProviders>
                        <GlobalLoader.Wrapper>
                            <Router/>
                        </GlobalLoader.Wrapper>
                    </GlobalProviders>
                </ErrorBoundary.Node>

                <DevTools/>
            </Focus.Lock>
        </ControllableStrictMode>
    );
};