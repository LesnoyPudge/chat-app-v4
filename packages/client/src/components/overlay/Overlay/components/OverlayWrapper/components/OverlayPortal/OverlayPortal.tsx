import { getHTMLElement } from '@utils';
import { FC, PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';



const overlay = getHTMLElement.overlayRoot();

export const OverlayPortal: FC<PropsWithChildren> = ({ children }) => {
    return createPortal(children, overlay);
};