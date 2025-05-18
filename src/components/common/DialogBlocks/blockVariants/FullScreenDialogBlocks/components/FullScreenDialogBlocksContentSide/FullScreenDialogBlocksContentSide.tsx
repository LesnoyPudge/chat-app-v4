import { FC, PropsWithChildren } from 'react';
import {
    FullScreenDialogBlocksMobileControls,
} from '../FullScreenDialogBlocksMobileControls';
import { createStyles } from '@/utils';
import { useFullScreenDialogBlocksContextProxy } from '../../context';
import { Focus, Heading, useRefManager } from '@lesnoypudge/utils-react';
import { Scrollable } from '@/components';
import {
    FullScreenDialogBlocksCloseButton,
} from '../FullScreenDialogBlocksCloseButton';
import {
    FullScreenDialogBlocksFormConfirmationBar,
} from '../FullScreenDialogBlocksFormConfirmationBar';



const styles = createStyles({
    wrapper: 'relative flex shrink grow basis-[800px]',
    contentWrapper: `
        max-w-[calc(740px+56px)] 
        pb-24 
        pl-10 
        pr-[calc(40px+56px)] 
        pt-[60px] 
        mobile:max-w-full 
        mobile:px-4
    `,
    content: 'pl-10 pt-[60px] mobile:pl-0',
    scrollable: 'size-full',
    toolbarWrapper: `
        pointer-events-none 
        absolute 
        inset-0 
        flex-1 
        mobile:hidden
    `,
    toolbarInner: `
        mr-2 
        flex 
        h-full 
        max-w-[calc(740px+56px)] 
        justify-end 
        pt-[60px]
    `,
    toolbarCol: 'flex w-[56px] flex-col',
});

export const FullScreenDialogBlocksContentSide: FC<PropsWithChildren> = ({
    children,
}) => {
    const {
        shouldFocusContent,
        shouldShowContent,
    } = useFullScreenDialogBlocksContextProxy();

    const containerRef = useRefManager<HTMLDivElement>(null);

    Focus.useMoveFocusInside({
        isEnabled: shouldFocusContent,
        containerRef,
    });

    if (!shouldShowContent) return;

    return (
        <div
            className={styles.wrapper}
            ref={containerRef}
        >
            <Scrollable className={styles.scrollable}>
                <div className={styles.contentWrapper}>
                    <FullScreenDialogBlocksMobileControls forceMenuButton/>

                    <div className={styles.content}>
                        <Heading.Provider>
                            {children}
                        </Heading.Provider>
                    </div>
                </div>
            </Scrollable>

            <div className={styles.toolbarWrapper}>
                <div className={styles.toolbarInner}>
                    <div className={styles.toolbarCol}>
                        <FullScreenDialogBlocksCloseButton hint='ESC'/>
                    </div>
                </div>
            </div>

            <FullScreenDialogBlocksFormConfirmationBar/>
        </div>
    );
};