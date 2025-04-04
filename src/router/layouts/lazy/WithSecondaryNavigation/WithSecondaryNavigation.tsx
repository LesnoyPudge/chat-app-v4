import { MobileMenu } from '@/components';
import { Focus, useRefManager } from '@lesnoypudge/utils-react';
import { cn, createStyles } from '@/utils';
import { FC, PropsWithChildren } from 'react';
import { Outlet } from 'react-router';
import { UserToolBar } from './components';



const styles = createStyles({
    wrapper: 'flex h-full w-full overflow-hidden',
    navigation: {
        base: `
            flex
            size-full 
            max-w-[240px] 
            flex-col 
            overflow-hidden 
            bg-primary-300
        `,
        wide: 'max-w-full',
    },
    content: `size-full bg-primary-200`,
});

export const WithSecondaryNavigation: FC<PropsWithChildren> = ({
    children,
}) => {
    const {
        isMobile,
        shouldShowMenu,
        shouldShowContent,
        shouldFocusContent,
    } = MobileMenu.useMobileMenu();
    const containerRef = useRefManager<HTMLDivElement>(null);

    Focus.useMoveFocusInside({
        containerRef: containerRef,
        isEnabled: shouldFocusContent,
    });

    return (
        <div className={styles.wrapper}>
            <If condition={shouldShowMenu}>
                <div className={cn(
                    styles.navigation.base,
                    isMobile && styles.navigation.wide,
                )}>
                    {children}

                    <UserToolBar/>
                </div>
            </If>

            <If condition={shouldShowContent}>
                <div
                    className={styles.content}
                    ref={containerRef}
                >
                    <Outlet/>
                </div>
            </If>
        </div>
    );
};