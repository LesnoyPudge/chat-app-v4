import { cn, createStyles } from '@/utils';
import { FC } from 'react';
import { Overlay } from '@/components';
import { RT } from '@lesnoypudge/types-utils-react/namespace';



const styles = createStyles({
    wrapper: 'pointer-events-none absolute inset-0 grid place-items-center',
});

export const BaseDialogBlocksWrapper: FC<
    RT.PropsWithChildrenAndClassName
> = ({
    className = '',
    children,
}) => {
    return (
        <Overlay.Dialog.Wrapper className={cn(styles.wrapper, className)}>
            {children}
        </Overlay.Dialog.Wrapper>
    );
};