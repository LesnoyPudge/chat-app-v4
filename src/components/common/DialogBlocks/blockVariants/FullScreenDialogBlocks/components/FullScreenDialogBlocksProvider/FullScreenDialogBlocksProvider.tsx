import { getAnimationVariants } from '@/utils';
import { MobileMenu, Overlay } from '@/components';
import { FullScreenDialogBlocksContext } from '../../context';
import { Types } from '../../types';
import { createWithDecorator } from '@lesnoypudge/utils-react';
import { useShake } from './hooks';



const {
    animationVariants,
} = getAnimationVariants.fullScreenDialog();

const { withDecorator } = createWithDecorator(({ children }) => (
    <MobileMenu.Provider>
        {children}
    </MobileMenu.Provider>
));

export namespace FullScreenDialogBlocksProvider {
    export type Props = Pick<
        Overlay.Dialog.Types.Provider.Props,
        'label'
        | 'controls'
        | 'children'
    >;
}

export const FullScreenDialogBlocksProvider = withDecorator<
    FullScreenDialogBlocksProvider.Props
>(({
    children,
    controls,
    label,
}) => {
    const mobileMenu = MobileMenu.useMobileMenu();

    const shake = useShake();

    const value: Types.Context = {
        ...mobileMenu,
        ...shake,
    };

    return (
        <Overlay.Dialog.Provider
            controls={controls}
            label={label}
            animationVariants={animationVariants}
        >
            <FullScreenDialogBlocksContext.Provider value={value}>
                {children}
            </FullScreenDialogBlocksContext.Provider>
        </Overlay.Dialog.Provider>
    );
});