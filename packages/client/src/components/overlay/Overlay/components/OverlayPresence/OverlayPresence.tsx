import { useContextSelector } from '@lesnoypudge/utils-react';
import { AnimatePresence } from 'motion/react';
import { FC, PropsWithChildren } from 'react';
import { OverlayContext } from '../../context';



export const OverlayPresence: FC<PropsWithChildren> = ({
    children,
}) => {
    const isOverlayExist = useContextSelector(
        OverlayContext,
        (s) => s.isOverlayExist,
    );

    return (
        <AnimatePresence>
            <If condition={isOverlayExist}>
                {children}
            </If>
        </AnimatePresence>
    );
};