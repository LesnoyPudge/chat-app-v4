import { invariant } from '@lesnoypudge/utils';
import { Variant, Variants } from 'motion/react';



type VariantWithKey = Variant & {
    key: string;
};

type VariantsWithKey<
    _Key extends PropertyKey = string,
> = Record<_Key, VariantWithKey>;

export const createVariants = <_Shape extends Variants>(
    variants: _Shape,
) => {
    return (
        Object.keys(variants)
            .reduce<VariantsWithKey>((acc, cur) => {
                const original = variants[cur];
                invariant(original);

                acc[cur] = {
                    ...original,
                    key: cur,
                };

                return acc;
            }, {})
    ) as VariantsWithKey<keyof _Shape>;
};