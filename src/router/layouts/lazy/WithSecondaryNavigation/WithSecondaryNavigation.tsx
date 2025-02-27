import { MobileMenu } from '@components';
import { Focus, ContextSelectable, useRefManager } from '@lesnoypudge/utils-react';
import { cn, createStyles } from '@utils';
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
        hidden: 'hidden',
        wide: 'max-w-full',
    },
    content: {
        base: `
            flex
            h-full 
            w-full 
            flex-1 
            flex-col 
            overflow-hidden 
            bg-primary-200
        `,
        hidden: 'hidden',
    },
});

export const WithSecondaryNavigation: FC<PropsWithChildren> = ({
    children,
}) => {
    const {
        shouldShowMenu,
        shouldShowContent,
    } = ContextSelectable.useProxy(MobileMenu.Context);
    const containerRef = useRefManager<HTMLDivElement>(null);

    return (
        <div className={styles.wrapper}>
            <div className={cn(
                styles.navigation.base,
                shouldShowMenu && styles.navigation.wide,
                shouldShowContent && styles.navigation.hidden,
            )}>
                {children}

                <UserToolBar/>
            </div>

            <Focus.Inside
                isEnabled={shouldShowContent}
                containerRef={containerRef}
            >
                <div
                    className={cn(
                        styles.content.base,
                        shouldShowMenu && styles.content.hidden,
                    )}
                    ref={containerRef}
                >
                    <Outlet/>
                </div>
            </Focus.Inside>
        </div>
    );
};