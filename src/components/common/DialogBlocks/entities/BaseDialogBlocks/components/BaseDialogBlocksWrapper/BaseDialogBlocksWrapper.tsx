import { cn, createStyles } from '@/utils';
import { FC } from 'react';
import { Overlay, Scrollable } from '@/components';
import { RT } from '@lesnoypudge/types-utils-react/namespace';



const styles = createStyles({
    wrapper: 'pointer-events-none absolute inset-0 grid place-items-center',
    inner: `
        pointer-events-auto
        flex
        max-h-[90dvh]
        w-[min(440px,100%)]
        flex-col 
        rounded 
        bg-primary-200 
        shadow-elevation-high
        [@media(max-width:440px)]:max-h-[100dvh]
        [@media(max-width:440px)]:rounded-none
    `,
    content: 'flex flex-col justify-between',
});

export const BaseDialogBlocksWrapper: FC<
    RT.PropsWithChildrenAndClassName
> = ({
    className = '',
    children,
}) => {
    return (
        <Overlay.Dialog.Wrapper className={cn(styles.wrapper, className)}>
            <div className={styles.inner}>
                <Scrollable
                    size='small'
                    withoutGutter
                >
                    <div className={styles.content}>
                        {children}
                    </div>
                </Scrollable>
            </div>
        </Overlay.Dialog.Wrapper>
    );
};