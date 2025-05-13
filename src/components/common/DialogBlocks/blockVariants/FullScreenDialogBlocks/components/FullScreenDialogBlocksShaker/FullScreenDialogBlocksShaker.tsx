import { createStyles } from '@/utils';
import { FC, PropsWithChildren } from 'react';
import { Overlay } from '@/components';
import { useFullScreenDialogBlocksContextProxy } from '../../context';
import { Motion } from '@/libs';



const styles = createStyles({
    wrapper: 'relative h-dvh w-dvw overflow-hidden bg-primary-200',
    inner: `
        absolute 
        inset-0 
        flex 
        transition-transform 
        duration-[20ms] 
        ease-linear 
        will-change-transform
    `,
});

export const FullScreenDialogBlocksShaker: FC<PropsWithChildren> = ({
    children,
}) => {
    const { shakeX, shakeY } = useFullScreenDialogBlocksContextProxy();

    return (
        <div className={styles.wrapper}>
            <Motion.div
                className={styles.inner}
                style={{
                    translateX: shakeX,
                    translateY: shakeY,
                }}
            >
                {children}
            </Motion.div>
        </div>
    );
};