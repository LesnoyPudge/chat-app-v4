import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { cn, createStyles } from '@utils';
import { animate, m, useMotionValue, useTransform } from 'motion/react';
import { FC } from 'react';
import { useUpdateEffect } from '@lesnoypudge/utils-react';



const styles = createStyles({
    wrapper: {
        base: `
            flex 
            h-6 
            w-10 
            shrink-0 
            rounded-full 
            bg-icon-300 
            p-[3px] 
            transition-all 
            duration-200 
            ease-linear
        `,
        active: 'bg-positive',
    },
    inner: 'relative w-full',
    ball: `
        absolute 
        top-1/2 
        h-[18px]
        w-[18px] 
        rounded-full 
        bg-white
    `,
    barsWrapper: 'relative h-full w-full',
    bars: {
        base: 'absolute left-1/2 top-1/2 w-0.5 bg-icon-300',
        active: 'bg-positive',
    },
});

export namespace CheckBoxIndicatorSlide {
    export type Props = (
        RT.PropsWithClassName
        & {
            checked: boolean;
        }
    );
}

export const CheckBoxIndicatorSlide: FC<CheckBoxIndicatorSlide.Props> = ({
    className = '',
    checked,
}) => {
    const x = useMotionValue(checked ? 1 : 0);
    /*
        keyframes
        0 % { width: 18px; height: 18; translateX: 0px; }
        30% { width: 24px; height: 16; }
        70% { width: 24px; height: 16; }
        100% { width: 18px; height: 18; translateX: 16px; }
    */
    const ballAnimated = {
        translateY: '-50%',
        translateX: useTransform(x, [0, 1], [0, 16]),
        width: useTransform(x, [0, 0.3, 0.7, 1], [18, 24, 24, 18]),
        height: useTransform(x, [0, 0.3, 0.7, 1], [18, 15, 15, 18]),
    };

    /*
        keyframes
        0 % { height: 12px; translateX: -1px; translateY: -6px; rotate: 45deg; }
        30% { height: 6px; translateY: -3px; rotate: 90deg; }
        70% { height: 6px; translateY: -3px; rotate: 90deg; }
        100% { height: 5px; translateX: -3px; translateY: 0px; rotate: 120deg; }
    */
    const firstBarAnimated = {
        height: useTransform(x, [0, 0.3, 0.7, 1], [12, 6, 6, 5]),
        translateX: useTransform(x, [0, 1], [-1, -3]),
        translateY: useTransform(x, [0, 0.3, 0.7, 1], [-6, -3, -3, 0]),
        rotate: useTransform(x, [0, 0.3, 0.7, 1], [45, 90, 90, 120]),
    };

    /*
        keyframes
        0 % { height: 12px; translateX: -1px; translateY: -6px; rotate: -45deg; }
        30% { height: 6px; translateY: -3px; rotate: -90deg; }
        70% { height: 6px; translateY: -3px; rotate: -90deg; }
        100% { height: 8px; translateX: 1px; translateY: -3px; rotate: -135deg; }
    */
    const secondBarAnimated = {
        height: useTransform(x, [0, 0.3, 0.7, 1], [12, 6, 6, 8]),
        translateX: useTransform(x, [0, 1], [-1, 1]),
        translateY: useTransform(x, [0, 0.3, 0.7, 1], [-6, -3, -3, -3]),
        rotate: useTransform(x, [0, 0.3, 0.7, 1], [-45, -90, -90, -135]),
    };

    useUpdateEffect(() => {
        animate(x, checked ? 1 : 0, {
            duration: 0.2,
            ease: 'linear',
        });
    }, [checked]);

    return (
        <div className={cn(
            styles.wrapper.base,
            { [styles.wrapper.active]: checked },
            className,
        )}>
            <div className={styles.inner}>
                <m.div
                    className={styles.ball}
                    style={ballAnimated}
                >
                    <div className={styles.barsWrapper}>
                        <m.div
                            className={cn(
                                styles.bars.base,
                                { [styles.bars.active]: checked },
                            )}
                            style={firstBarAnimated}
                        >
                        </m.div>

                        <m.div
                            className={cn(
                                styles.bars.base,
                                { [styles.bars.active]: checked },
                            )}
                            style={secondBarAnimated}
                        >
                        </m.div>
                    </div>
                </m.div>
            </div>
        </div>
    );
};