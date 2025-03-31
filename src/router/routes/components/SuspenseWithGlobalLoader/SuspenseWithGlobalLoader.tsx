import { GlobalLoader } from '@/root/components';
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
        <Suspense fallback={<GlobalLoader.Toggle displayId={loaderId}/>}>
            <GlobalLoader.Disable>
                {children}
            </GlobalLoader.Disable>
        </Suspense>
    );
};