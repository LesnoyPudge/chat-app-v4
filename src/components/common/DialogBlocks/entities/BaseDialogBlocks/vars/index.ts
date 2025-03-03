import { Overlay } from '@/components';
import { getAnimationVariants } from '@/utils';



type Props = Pick<
    Overlay.Dialog.Types.Provider.Props,
    'animationVariants'
    | 'backdropAnimationVariants'
    | 'withBackdrop'
>;

const {
    animationVariants: baseModalVariants,
} = getAnimationVariants.baseModal();

const {
    animationVariants: baseModalBackdropVariants,
} = getAnimationVariants.baseModalBackdrop();

export const providerProps: Props = {
    withBackdrop: true,
    animationVariants: baseModalVariants,
    backdropAnimationVariants: baseModalBackdropVariants,
};