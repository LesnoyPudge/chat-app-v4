import { GlobalLoader } from '@root/GlobalLoader';
import { FC, PropsWithChildren, Suspense } from 'react';



export const SuspenseWithGlobalLoader: FC<PropsWithChildren> = ({
    children,
}) => {
    return (
        <Suspense fallback={<GlobalLoader.Enable/>}>
            <GlobalLoader.Disable>
                {children}
            </GlobalLoader.Disable>
        </Suspense>
    );
};