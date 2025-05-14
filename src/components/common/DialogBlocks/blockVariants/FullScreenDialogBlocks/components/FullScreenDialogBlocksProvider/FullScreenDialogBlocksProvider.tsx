import { MobileMenu, Overlay } from '@/components';
import { FullScreenDialogBlocksContext } from '../../context';
import { Types } from '../../types';
import { createWithDecorator } from '@lesnoypudge/utils-react';
import { useShake } from './hooks';
import { useMotionValue } from 'motion/react';
import { AnimationPresets } from '@/entities';



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
    const progress = useMotionValue(2);
    const mobileMenu = MobileMenu.useMobileMenu();
    const shake = useShake();

    const value: Types.Context = {
        ...mobileMenu,
        ...shake,
    };

    const { onEnter, onExit, style } = AnimationPresets.useFullScreenDialog({
        progress,
    });

    return (
        <Overlay.Dialog.Provider
            controls={controls}
            label={label}
            progress={progress}
            dialogStyle={style}
            onEnter={onEnter}
            onExit={onExit}
        >
            <FullScreenDialogBlocksContext.Provider value={value}>
                {children}
            </FullScreenDialogBlocksContext.Provider>
        </Overlay.Dialog.Provider>
    );
});