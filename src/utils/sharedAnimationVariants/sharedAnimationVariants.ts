import { invariant, isCallable, merge } from '@lesnoypudge/utils';
import { TargetAndTransition, Variant, Variants } from 'motion/react';



export namespace createVariants {
    export type Shape = {
        initial: Variant;
        animate: Variant;
        exit: Variant;
    };

    export type VariantWithKey = Variant & {
        key: string;
    };

    export type VariantsWithKey<
        _Key extends PropertyKey = string,
    > = Record<_Key, VariantWithKey>;

    export type BaseVariantsWithKey = VariantsWithKey<keyof Shape>;

    export type Transition = Pick<
        TargetAndTransition,
        'transition'
    >['transition'];
}

export const createVariants = <_Shape extends Variants>(
    variants: _Shape,
    sharedTransition?: createVariants.Transition,
) => {
    return (
        Object.keys(variants)
            .reduce<createVariants.VariantsWithKey>((acc, cur) => {
                const original = variants[cur];
                invariant(original);

                if (isCallable(original)) {
                    const fn: typeof original = (...args) => {
                        const result = original(...args);

                        if (typeof result === 'string') return result;

                        return {
                            ...result,
                            transition: {
                                ...sharedTransition,
                                ...(
                                    'transition' in result
                                        ? result.transition
                                        : {}
                                ),
                            },
                        };
                    };

                    (fn as createVariants.VariantWithKey).key = cur;

                    acc[cur] = (fn as createVariants.VariantWithKey);

                    return acc;
                }

                acc[cur] = {
                    ...original,
                    transition: {
                        ...sharedTransition,
                        ...(
                            'transition' in original
                                ? original.transition
                                : {}
                        ),
                    },
                    key: cur,
                };

                return acc;
            }, {})
    ) as createVariants.VariantsWithKey<keyof _Shape>;
};

const factory = (
    shape: createVariants.Shape,
    sharedTransition?: createVariants.Transition,
) => {
    return (
        extraShape?: createVariants.Shape,
        extraSharedTransition?: createVariants.Transition,
    ) => {
        return {
            animationVariants: createVariants(
                merge(shape, extraShape ?? {}),
                merge(sharedTransition ?? {}, extraSharedTransition ?? {}),
            ),
        };
    };
};

export const getAnimationVariants = {
    baseDialog: factory({
        initial: {
            opacity: 0,
            scale: 0.1,
            transition: {
                duration: 0.35,
                ease: 'backOut',
            },
        },
        animate: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.35,
                ease: 'backOut',
            },
        },
        exit: {
            opacity: 0,
            scale: 0.1,
            transition: {
                duration: 0.15,
                ease: 'backOut',
            },
        },
    }),

    baseDialogBackdrop: factory({
        initial: {
            opacity: 0,
            transition: {
                duration: 0.35,
                ease: 'backOut',
            },
        },
        animate: {
            opacity: 1,
            transition: {
                duration: 0.35,
                ease: 'backOut',
            },
        },
        exit: {
            opacity: 0,
            transition: {
                duration: 0.15,
                ease: 'backOut',
            },
        },
    }),

    fullScreenDialog: factory({
        initial: {
            opacity: 0,
            scale: 1.2,
            transition: {
                duration: 0.2,
                ease: 'backOut',
            },
        },
        animate: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.2,
                ease: 'backOut',
            },
        },
        exit: {
            opacity: 0,
            scale: 1.2,
            transition: {
                duration: 0.2,
                ease: 'backOut',
            },
        },
    }),

    popoverMenu: factory({
        initial: {
            scale: 0.95,
            opacity: 0,
        },
        animate: {
            scale: 1,
            opacity: 1,
        },
        exit: {
            scale: 0.95,
            opacity: 0,
        },
    }, {
        duration: 0.15,
        ease: 'backOut',
    }),

    custom: <_Shape extends Variants>(
        variants: _Shape,
        sharedTransition?: createVariants.Transition,
    ) => {
        return {
            animationVariants: createVariants(variants, sharedTransition),
        };
    },

    withOpacity: factory({
        initial: {
            opacity: 0,
        },
        animate: {
            opacity: 1,
        },
        exit: {
            opacity: 0,
        },
    }, {
        duration: 0.125,
        ease: 'backOut',
    }),
};