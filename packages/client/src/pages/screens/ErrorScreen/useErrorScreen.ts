import { ErrorBoundary, useFunction } from '@lesnoypudge/utils-react';
import { useContext } from 'react';



export const useErrorScreen = () => {
    const {
        resetErrorBoundary,
        counter,
    } = useContext(ErrorBoundary.Context);

    const onClick = useFunction(() => {
        if (counter.get() === 5) {
            window.location.reload();
            return;
        }

        counter.inc();
        resetErrorBoundary();
    });

    return {
        onClick,
    };
};