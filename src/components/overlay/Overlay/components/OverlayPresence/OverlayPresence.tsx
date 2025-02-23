import { ContextSelectable } from '@lesnoypudge/utils-react';
import { AnimatePresence } from 'motion/react';
import { FC, PropsWithChildren } from 'react';
import { OverlayContext } from '../../context';



export const OverlayPresence: FC<PropsWithChildren> = ({
    children,
}) => {
    const { isOverlayExist } = ContextSelectable.useSelector(
        OverlayContext,
        ({ isOverlayExist }) => ({ isOverlayExist }),
    );

    return (
        <AnimatePresence>
            <If condition={isOverlayExist}>
                {children}
            </If>
        </AnimatePresence>
    );
};