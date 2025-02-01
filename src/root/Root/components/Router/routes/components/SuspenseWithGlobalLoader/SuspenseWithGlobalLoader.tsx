import { GlobalLoader } from '@root/GlobalLoader';
import { FC, PropsWithChildren, Suspense } from 'react';



export namespace SuspenseWithGlobalLoader {
    export type Props = (
        PropsWithChildren
        & {
            loaderId?: string;
        }
    );
}

export const SuspenseWithGlobalLoader: FC<SuspenseWithGlobalLoader.Props> = ({
    loaderId,
    children,
}) => {
    return (
        <Suspense fallback={<GlobalLoader.Enable id={loaderId}/>}>
            <GlobalLoader.Disable id={loaderId}>
                {children}
            </GlobalLoader.Disable>
        </Suspense>
    );
};