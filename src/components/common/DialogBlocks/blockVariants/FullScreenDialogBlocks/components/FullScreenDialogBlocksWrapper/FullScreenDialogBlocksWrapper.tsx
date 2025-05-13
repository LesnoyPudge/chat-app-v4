import { FC, PropsWithChildren } from 'react';
import { Overlay } from '@/components';



export const FullScreenDialogBlocksWrapper: FC<PropsWithChildren> = ({
    children,
}) => {
    return (
        <Overlay.Dialog.Wrapper>
            {children}
        </Overlay.Dialog.Wrapper>
    );
};