import { cn, createStyles } from '@/utils';
import { FC, PropsWithChildren } from 'react';
import { useFullScreenDialogBlocksContextProxy } from '../../context';
import { Focus, useRefManager } from '@lesnoypudge/utils-react';
import { Scrollable } from '@/components';
import {
    FullScreenDialogBlocksMobileControls,
} from '../FullScreenDialogBlocksMobileControls';



const styles = createStyles({
    wrapper: 'flex shrink-0 grow bg-primary-300',
    scrollable: 'size-full',
    content: {
        base: `
            ml-auto 
            w-full 
            max-w-[218px] 
            py-[60px] 
            pl-5
            pr-1.5
        `,
        wide: 'max-w-full',
    },
});

export const FullScreenDialogBlocksNavigationSide: FC<PropsWithChildren> = ({
    children,
}) => {
    const {
        shouldFocusMenu,
        shouldShowMenu,
    } = useFullScreenDialogBlocksContextProxy();

    const containerRef = useRefManager<HTMLDivElement>(null);

    Focus.useMoveFocusInside({
        containerRef,
        isEnabled: shouldFocusMenu,
    });

    if (!shouldShowMenu) return null;

    return (
        <div
            className={styles.wrapper}
            ref={containerRef}
        >
            <Scrollable className={styles.scrollable}>
                <div className={cn(
                    styles.content.base,
                    shouldFocusMenu && styles.content.wide,
                )}>
                    <FullScreenDialogBlocksMobileControls/>

                    {children}
                </div>
            </Scrollable>
        </div>
    );
};