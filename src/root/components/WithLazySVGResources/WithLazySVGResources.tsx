import { basePreloadedComponent, getHTMLElement } from '@/utils';
import { FC, PropsWithChildren, Suspense } from 'react';
import { createPortal } from 'react-dom';



const { load, trigger } = basePreloadedComponent;


export const LazySVGResources = {
    trigger,

    Masks: load(() => import('./components/Masks')),

    SpriteSheet: load(() => import('./components/SpriteSheet')),
};

const Items: FC = () => {
    return (
        <Suspense>
            <LazySVGResources.Masks/>

            <LazySVGResources.SpriteSheet/>
        </Suspense>
    );
};

const PortalToSVGResourcesLayer = () => createPortal(
    <Items/>,
    getHTMLElement.svgResourcesRoot,
);

export const WithLazySVGResources: FC<PropsWithChildren> = ({
    children,
}) => {
    return (
        <>
            {children}

            <PortalToSVGResourcesLayer/>
        </>
    );
};