import { MobileMenu } from '@components';
import { Focus, ContextSelectable, useRefManager } from '@lesnoypudge/utils-react';
import { cn, createStyles } from '@utils';
import {
    ActionButtons,
    HomePageButton,
    NavigationList,
} from './components';
import { FC } from 'react';



const styles = createStyles({
    wrapper: {
        base: `
            flex 
            h-full 
            w-[72px] 
            shrink-0 
            flex-col 
            gap-2 
            bg-primary-500 
            py-2
        `,
        hidden: 'hidden',
    },
});

export const PrimaryNavigation: FC = () => {
    const {
        shouldShowMenu,
        shouldShowContent,
    } = ContextSelectable.useProxy(MobileMenu.Context);
    const containerRef = useRefManager<HTMLDivElement>(null);

    return (
        <Focus.Inside
            isEnabled={shouldShowMenu}
            containerRef={containerRef}
        >
            <div
                className={cn(
                    styles.wrapper.base,
                    shouldShowContent && styles.wrapper.hidden,
                )}
                ref={containerRef}
            >
                <HomePageButton/>

                <NavigationList/>

                <ActionButtons/>
            </div>
        </Focus.Inside>
    );
};