import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { useUpdateEffect } from '@lesnoypudge/utils-react';
import { cn, createStyles, createVariants } from '@utils';
import { m, useAnimate, useAnimation, useMotionValue, useTransform } from 'motion/react';
import { FC } from 'react';
import { animated, easings, useSpringValue } from '@react-spring/web';



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

const sharedTransition: createVariants.Transition = {
    duration: 2,
    ease: 'linear',
    // times: [0, 0.3, 0.7, 1],
    // repeatType: 'reverse',
    // repeat: Infinity,
};

/*
    keyframes
    0 % { width: 18px; height: 18; translateX: 0px; }
    30% { width: 24px; height: 16; }
    70% { width: 24px; height: 16; }
    100% { width: 18px; height: 18; translateX: 16px; }
` */
const ballVariants = createVariants({
    base: {
        width: [18, 24, 24, 18],
        height: [18, 15, 15, 18],
        translateY: '-50%',
        // translateX: [0, 16],
    },
    off: {
        translateX: 0,
    },
    on: {
        translateX: 16,
    },
}, sharedTransition);

/*
    keyframes
    0 % { height: 12px; translateX: -1px; translateY: -6px; rotate: 45deg; }
    30% { height: 6px; translateY: -3px; rotate: 90deg; }
    70% { height: 6px; translateY: -3px; rotate: 90deg; }
    100% { height: 5px; translateX: -3px; translateY: 0px; rotate: 120deg; }
` */
const firstBarVariants = createVariants({
    off: {},
    on: {},
}, sharedTransition);

/*
    keyframes
    0 % { height: 12px; translateX: -1px; translateY: -6px; rotate: -45deg; }
    30% { height: 6px; translateY: -3px; rotate: -90deg; }
    70% { height: 6px; translateY: -3px; rotate: -90deg; }
    100% { height: 8px; translateX: 1px; translateY: -3px; rotate: -135deg; }
` */
const secondBarVariants = createVariants({
    off: {},
    on: {},
}, sharedTransition);

export namespace CheckBoxIndicatorSlide {
    export type Props = (
        RT.PropsWithClassName
        & {
            checked: boolean;
        }
    );
}


export const CheckBoxIndicatorSlideOld: FC<CheckBoxIndicatorSlide.Props> = ({
    className = '',
    checked,
}) => {
    const x = useSpringValue(checked ? 1 : 0, {
        config: {
            duration: 2_000,
            easing: easings.linear,
        },
    });

    useUpdateEffect(() => {
        x.start(checked ? 1 : 0);
    }, [checked]);

    return (
        <div className={cn(
            styles.wrapper.base,
            { [styles.wrapper.active]: checked },
            className,
        )}
        >
            <div className={styles.inner}>
                <animated.div
                    className={styles.ball}
                    style={{
                        /*
                            keyframes
                            0 % { width: 18px; height: 18; translateX: 0px; }
                            30% { width: 24px; height: 16; }
                            70% { width: 24px; height: 16; }
                            100% { width: 18px; height: 18; translateX: 16px; }
                        ` */
                        width: x.to({
                            range: [0, 0.3, 0.7, 1],
                            output: [18, 24, 24, 18],
                        }).to((value) => `${value}px`),

                        height: x.to({
                            range: [0, 0.3, 0.7, 1],
                            output: [18, 15, 15, 18],
                        }).to((value) => `${value}px`),

                        transform: x.to({
                            range: [0, 1],
                            output: [0, 16],
                        }).to((value) => `translateY(-50%) translateX(${value}px)`),
                    }}
                >
                    <div className={styles.barsWrapper}>
                        <animated.div
                            className={cn(
                                styles.bars.base,
                                { [styles.bars.active]: checked },
                            )}
                            style={{
                                /*
                                    keyframes
                                    0 % { height: 12px; translateX: -1px; translateY: -6px; rotate: 45deg; }
                                    30% { height: 6px; translateY: -3px; rotate: 90deg; }
                                    70% { height: 6px; translateY: -3px; rotate: 90deg; }
                                    100% { height: 5px; translateX: -3px; translateY: 0px; rotate: 120deg; }
                                ` */
                                height: x.to({
                                    range: [0, 0.3, 0.7, 1],
                                    output: [12, 6, 6, 5],
                                }).to((value) => `${value}px`),
                                translateX: x.to({
                                    range: [0, 1],
                                    output: [-1, -3],
                                }).to((value) => `${value}px`),
                                translateY: x.to({
                                    range: [0, 0.3, 0.7, 1],
                                    output: [-6, -3, -3, 0],
                                }).to((value) => `${value}px`),
                                rotate: x.to({
                                    range: [0, 0.3, 0.7, 1],
                                    output: [45, 90, 90, 120],
                                }).to((value) => `${value}deg`),
                            }}
                        >
                        </animated.div>

                        <animated.div
                            className={cn(
                                styles.bars.base,
                                { [styles.bars.active]: checked },
                            )}
                            style={{
                                /*
                                    keyframes
                                    0 % { height: 12px; translateX: -1px; translateY: -6px; rotate: -45deg; }
                                    30% { height: 6px; translateY: -3px; rotate: -90deg; }
                                    70% { height: 6px; translateY: -3px; rotate: -90deg; }
                                    100% { height: 8px; translateX: 1px; translateY: -3px; rotate: -135deg; }
                                ` */
                                height: x.to({
                                    range: [0, 0.3, 0.7, 1],
                                    output: [12, 6, 6, 8],
                                }).to((value) => `${value}px`),
                                translateX: x.to({
                                    range: [0, 1],
                                    output: [-1, 1],
                                }).to((value) => `${value}px`),
                                translateY: x.to({
                                    range: [0, 0.3, 0.7, 1],
                                    output: [-6, -3, -3, -3],
                                }).to((value) => `${value}px`),
                                rotate: x.to({
                                    range: [0, 0.3, 0.7, 1],
                                    output: [-45, -90, -90, -135],
                                }).to((value) => `${value}deg`),
                            }}
                        >
                        </animated.div>
                    </div>
                </animated.div>
            </div>
        </div>
    );
};

export const CheckBoxIndicatorSlide: FC<CheckBoxIndicatorSlide.Props> = ({
    className = '',
    checked,
}) => {
    const value = useMotionValue(checked ? 1 : 0);
    const translateX = useTransform(value, [0, 1], [0, 16]);
    const width = useTransform(value, [0, 0.3, 0.7, 1], [18, 24, 24, 18]);
    const height = useTransform(value, [0, 0.3, 0.7, 1], [18, 15, 15, 18]);

    const controls = useAnimation();

    useUpdateEffect(() => {
        // controls.start();
        // value.set(checked ? 1 : 0);
        console.log(value.isAnimating());

        // value.
        // const ballVariant = (
        //     checked ? ballVariants.on.key : ballVariants.off.key
        // );
        // void controls.start([ballVariants.base.key, ballVariant]);

        // void controls.start(ballVariant);
        // void controls.start(ballVariants.base.key);
    }, [checked]);

    // const x = useSpringValue(checked ? 1 : 0, {
    //     config: {
    //         duration: 200,
    //         easing: easings.linear,
    //     },
    // });

    // useUpdateEffect(() => {
    //     x.start(checked ? 1 : 0);
    // }, [checked]);


    const firstBarVariant = (
        checked ? firstBarVariants.on.key : firstBarVariants.off.key
    );
    const secondBarVariant = (
        checked ? secondBarVariants.on.key : secondBarVariants.off.key
    );

    return (
        <div className={cn(
            styles.wrapper.base,
            { [styles.wrapper.active]: checked },
            className,
        )}
        >
            <div className={styles.inner}>
                <m.div
                    className={styles.ball}
                    // transition={sharedTransition}
                    // variants={ballVariants}
                    // variants={{
                    //     on: {
                    //         translateX: 0,
                    //     },
                    //     off: {
                    //         translateX: 16,
                    //     },
                    // }}
                    // initial={ballVariants.base.key}
                    // animate={controls}
                    style={{
                        translateY: '-50%',
                        translateX,
                        width,
                        height,
                        /*
                            keyframes
                            0 % { width: 18px; height: 18; translateX: 0px; }
                            30% { width: 24px; height: 16; }
                            70% { width: 24px; height: 16; }
                            100% { width: 18px; height: 18; translateX: 16px; }
                        ` */
                        // width: x.to({
                        //     range: [0, 0.3, 0.7, 1],
                        //     output: [18, 24, 24, 18],
                        // }).to((value) => `${value}px`),

                        // height: x.to({
                        //     range: [0, 0.3, 0.7, 1],
                        //     output: [18, 15, 15, 18],
                        // }).to((value) => `${value}px`),

                        // transform: x.to({
                        //     range: [0, 1],
                        //     output: [0, 16],
                        // }).to((value) => `translateY(-50%) translateX(${value}px)`),
                    }}
                >
                    <div className={styles.barsWrapper}>
                        <m.div
                            className={cn(
                                styles.bars.base,
                                { [styles.bars.active]: checked },
                            )}
                            variants={firstBarVariants}
                            style={{
                                /*
                                    keyframes
                                    0 % { height: 12px; translateX: -1px; translateY: -6px; rotate: 45deg; }
                                    30% { height: 6px; translateY: -3px; rotate: 90deg; }
                                    70% { height: 6px; translateY: -3px; rotate: 90deg; }
                                    100% { height: 5px; translateX: -3px; translateY: 0px; rotate: 120deg; }
                                ` */
                                // height: x.to({
                                //     range: [0, 0.3, 0.7, 1],
                                //     output: [12, 6, 6, 5],
                                // }).to((value) => `${value}px`),
                                // translateX: x.to({
                                //     range: [0, 1],
                                //     output: [-1, -3],
                                // }).to((value) => `${value}px`),
                                // translateY: x.to({
                                //     range: [0, 0.3, 0.7, 1],
                                //     output: [-6, -3, -3, 0],
                                // }).to((value) => `${value}px`),
                                // rotate: x.to({
                                //     range: [0, 0.3, 0.7, 1],
                                //     output: [45, 90, 90, 120],
                                // }).to((value) => `${value}deg`),
                            }}
                        >
                        </m.div>

                        <m.div
                            className={cn(
                                styles.bars.base,
                                { [styles.bars.active]: checked },
                            )}
                            variants={secondBarVariants}
                            style={{
                                /*
                                    keyframes
                                    0 % { height: 12px; translateX: -1px; translateY: -6px; rotate: -45deg; }
                                    30% { height: 6px; translateY: -3px; rotate: -90deg; }
                                    70% { height: 6px; translateY: -3px; rotate: -90deg; }
                                    100% { height: 8px; translateX: 1px; translateY: -3px; rotate: -135deg; }
                                ` */
                                // height: x.to({
                                //     range: [0, 0.3, 0.7, 1],
                                //     output: [12, 6, 6, 8],
                                // }).to((value) => `${value}px`),
                                // translateX: x.to({
                                //     range: [0, 1],
                                //     output: [-1, 1],
                                // }).to((value) => `${value}px`),
                                // translateY: x.to({
                                //     range: [0, 0.3, 0.7, 1],
                                //     output: [-6, -3, -3, -3],
                                // }).to((value) => `${value}px`),
                                // rotate: x.to({
                                //     range: [0, 0.3, 0.7, 1],
                                //     output: [-45, -90, -90, -135],
                                // }).to((value) => `${value}deg`),
                            }}
                        >
                        </m.div>
                    </div>
                </m.div>
            </div>
        </div>
    );
};