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
            h-full 
            w-full 
            max-w-[240px] 
            flex-col 
            overflow-hidden 
            bg-primary-300
        `,
        wide: 'max-w-full',
    },
    content: `
        flex
        h-full 
        w-full 
        flex-1 
        flex-col 
        overflow-hidden 
        bg-primary-200
    `,
});

export const WithSecondaryNavigation: FC<PropsWithChildren> = ({
    children,
}) => {
    const {
        shouldShowMenu,
        shouldShowContent,
    } = MobileMenu.useMobileMenu();
    const containerRef = useRefManager<HTMLDivElement>(null);

    return (
        <div className={styles.wrapper}>
            <If condition={!shouldShowContent}>
                <div className={cn(
                    styles.navigation.base,
                    shouldShowMenu && styles.navigation.wide,
                )}>
                    {children}

                    <UserToolBar/>
                </div>
            </If>

            <If condition={!shouldShowMenu}>
                <Focus.Inside
                    isEnabled={shouldShowContent}
                    containerRef={containerRef}
                >
                    <div
                        className={styles.content}
                        ref={containerRef}
                    >
                        <Outlet/>
                    </div>
                </Focus.Inside>
            </If>
        </div>
    );
};