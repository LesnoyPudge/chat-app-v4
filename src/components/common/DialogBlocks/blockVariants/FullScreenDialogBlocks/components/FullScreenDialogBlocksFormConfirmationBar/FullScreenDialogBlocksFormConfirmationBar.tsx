import { useIsAnimating, useTrans } from '@/hooks';
import { Motion } from '@/libs';
import { cn, createStyles } from '@/utils';
import { If } from '@lesnoypudge/react-if';
import { AnimatePresence, useMotionValue, useTransform } from 'motion/react';
import { FC } from 'react';
import { Form } from '@/components';
import { useFullScreenDialogBlocksContextProxy } from '../../context';



const styles = createStyles({
    wrapper: `
        pointer-events-none 
        absolute 
        bottom-0 
        left-0 
        right-0 
        max-w-[740px] 
        px-5 
        pb-5`,
    inner: {
        base: `
            flex 
            w-full 
            items-center 
            gap-2.5 
            rounded-md 
            bg-primary-600 
            p-2.5 
            shadow-elevation-high 
            transition-all
        `,
        animating: 'pointer-events-none',
        idle: 'pointer-events-auto',
        shaking: 'bg-danger text-white',
    },
    text: 'mr-auto truncate font-medium',
});

export const FullScreenDialogBlocksFormConfirmationBar: FC = () => {
    const { t } = useTrans();
    const isDirty = Form.useFormStore((v) => v.isDirty);
    const { isShaking } = useFullScreenDialogBlocksContextProxy();

    const translateY = useTransform(
        useTransform(
            useMotionValue(isDirty ? 1 : 0),
            isDirty ? [0, 0.8, 1] : [0, 0.1, 1],
            isDirty ? [100, -30, 0] : [100, -65, 0],
        ),
        (v) => `${v}%`,
    );

    const isAnimating = useIsAnimating(translateY);

    return (
        <AnimatePresence>
            <If condition={isDirty}>
                <Motion.div
                    className={styles.wrapper}
                    style={{ translateY }}
                    aria-live='polite'
                >
                    <div className={cn(
                        styles.inner.base,
                        isAnimating && styles.inner.animating,
                        !isAnimating && styles.inner.idle,
                        isShaking && styles.inner.shaking,
                    )}>
                        <div className={styles.text}>
                            {t('FullScreenDialogBlocks.FormConfirmationBar.warning')}
                        </div>

                        <Form.ResetButton
                            stylingPreset='lite'
                            size='small'
                        >
                            {t('COMMON.Reset')}
                        </Form.ResetButton>

                        <Form.SubmitButton
                            stylingPreset='brandPositive'
                            size='small'
                        >
                            {t('FullScreenDialogBlocks.FormConfirmationBar.save')}
                        </Form.SubmitButton>
                    </div>
                </Motion.div>
            </If>
        </AnimatePresence>
    );
};