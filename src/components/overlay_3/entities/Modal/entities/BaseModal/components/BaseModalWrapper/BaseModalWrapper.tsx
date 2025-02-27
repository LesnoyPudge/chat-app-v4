import { Overlay } from '@components';
import { FC } from 'react';



export const BaseModalWrapper: FC<
    Overlay.Modal.Base.Types.Wrapper.Props
> = ({
    className = '',
    children,
}) => {
    return (
        <Overlay.Dialog.Wrapper className={className}>
            {children}
        </Overlay.Dialog.Wrapper>
    );
};