import { MobileMenu } from '@components';
import { Focus, useContextProxy, useRefManager } from '@lesnoypudge/utils-react';
import { cn, createStyles } from '@utils';
import {
    ActionButtons,
    HomePageButton,
    ConversationList,
    ServerList,
} from './components';



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

export const PrimaryNavigation = () => {
    const {
        shouldShowMenu,
        shouldShowContent,
    } = useContextProxy(MobileMenu.Context);
    const containerRef = useRefManager<HTMLDivElement>(null);

    return (
        <Focus.Inside
            isEnabled={shouldShowMenu}
            containerRef={containerRef}
            once
        >
            <div
                className={cn(
                    styles.wrapper.base,
                    shouldShowContent && styles.wrapper.hidden,
                )}
                ref={containerRef}
            >
                <HomePageButton/>

                <ConversationList/>

                <ServerList/>

                <ActionButtons/>
            </div>
        </Focus.Inside>
    );
};