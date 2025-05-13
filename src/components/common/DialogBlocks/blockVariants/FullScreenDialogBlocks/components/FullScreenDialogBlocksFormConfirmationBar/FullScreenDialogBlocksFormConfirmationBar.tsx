import { useAnimateTransition, useIsAnimating, useTrans } from '@/hooks';
import { Motion } from '@/libs';
import { cn, createStyles } from '@/utils';
import { If } from '@lesnoypudge/react-if';
import { animate, useMotionValue, useTransform } from 'motion/react';
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
        pb-5
        mobile:max-w-full
    `,
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
    const isChanged = Form.useFormStore((v) => !v.isDefaultValue);
    const { isShaking } = useFullScreenDialogBlocksContextProxy();

    const progress = useMotionValue(isChanged ? 1 : 0);

    const translateY = useTransform(
        useTransform(
            progress,
            isChanged ? [0, 0.8, 1] : [0, 0.1, 1],
            isChanged ? [100, -30, 0] : [100, -65, 0],
        ),
        (v) => `${v}%`,
    );

    const isPresent = useAnimateTransition({
        isExist: isChanged,
        progress,
        onEnter: () => animate(progress, 1),
        onExit: () => animate(progress, 0),
    });

    const isAnimating = useIsAnimating(progress);

    return (
        <If condition={isPresent}>
            <Motion.div
                className={styles.wrapper}
                style={{ translateY }}
                aria-live='polite'
            >
                <div className={cn(
                    styles.inner.base,
                    isAnimating && styles.inner.animating,
                    !isAnimating && styles.inner.idle,
                    styles.inner.idle,
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
    );
};