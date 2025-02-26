import { ContextSelectable } from '@lesnoypudge/utils-react';
import { DialogProvider } from '../../components';
import { T } from '@lesnoypudge/types-utils-base/namespace';
import { Popover } from '../../../Popover';



export type DialogContext = (
    Popover.Context
    & Required<T.Except<
        DialogProvider.OwnProps,
        'backdropAnimationVariants' | 'animationVariants'
    >>
    & Pick<
        DialogProvider.OwnProps,
        'backdropAnimationVariants' | 'animationVariants'
    >
);

export const DialogContext = ContextSelectable.createContext<DialogContext>();