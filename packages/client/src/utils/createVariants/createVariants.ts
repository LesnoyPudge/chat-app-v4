import { invariant } from '@lesnoypudge/utils';
import { TargetAndTransition, Variant, Variants } from 'motion/react';



type VariantWithKey = Variant & {
    key: string;
};

type VariantsWithKey<
    _Key extends PropertyKey = string,
> = Record<_Key, VariantWithKey>;

export namespace createVariants {
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
            .reduce<VariantsWithKey>((acc, cur) => {
                const original = variants[cur];
                invariant(original);

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
    ) as VariantsWithKey<keyof _Shape>;
};