import { MobileMenu } from '@/components';
import { Focus, useRefManager } from '@lesnoypudge/utils-react';
import { createStyles } from '@/utils';
import { ActionButtons, HomePageButton, NavigationList } from './components';
import { FC } from 'react';



const styles = createStyles({
    wrapper: `
        flex 
        h-full 
        w-[72px] 
        shrink-0 
        flex-col 
        gap-2 
        bg-primary-500 
        py-2
    `,
});

export const PrimaryNavigation: FC = () => {
    const {
        shouldFocusMenu,
        shouldShowMenu,
    } = MobileMenu.useMobileMenu();
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
            role='list'
        >
            <HomePageButton/>

            <NavigationList/>

            <ActionButtons/>
        </div>
    );
};