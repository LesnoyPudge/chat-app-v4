import { Button, MobileMenu, Overlay, Placeholder, Scrollable, Sprite } from '@/components';
import { createSleep, lazyLoad, useBoolean } from '_@lesnoypudge/utils-react';
import { FC, PropsWithChildren, Suspense, useEffect, useRef } from 'react';
import { ChatPageTemplate } from '@/router/templates';
import { Store } from '@/features';
import { ASSETS } from '@/generated/ASSETS';
import { TopBar } from '@/router/layouts/bundled';
import { Heading, useRefManager } from '@lesnoypudge/utils-react';
import { createStyles } from '@/utils';
import { useTrans } from '@/hooks';


const serverId = 'qwe';
const channelId = 'zxc';

const Header: FC = () => {
    const {
        toggle,
        shouldShowExtraPanel,
    } = ChatPageTemplate.useChatPageTemplate();
    const { t } = useTrans();
    const toggleButtonRef = useRefManager<HTMLButtonElement>(null);

    const isTextChannel = Store.useSelector(
        Store.Channels.Selectors.selectIsTextChannelById(channelId),
    );

    const name = Store.useSelector(
        Store.Channels.Selectors.selectNameById(channelId),
    );

    const sprite = (
        isTextChannel
            ? ASSETS.IMAGES.SPRITE.TEXT_ROOM_ICON
            : ASSETS.IMAGES.SPRITE.VOICE_ROOM_ICON
    );

    const toggleButtonDescription = (
        shouldShowExtraPanel
            ? t('ChannelPanel.Header.toggleButton.description.off')
            : t('ChannelPanel.Header.toggleButton.description.on')
    );

    const styles = createStyles({
        wrapper: 'gap-2 px-4',
        icon: 'size-6 fill-icon-300',
        heading: 'truncate font-bold text-color-primary',
        toggleButton: `
            ml-auto
            size-8 
            fill-icon-300 
            hover-focus-visible:fill-icon-100
        `,
        toggleIcon: 'm-auto size-6',
    });

    return (
        <TopBar
            className={styles.wrapper}
            withMobileButton
        >
            <Placeholder.With reveal={!!name}>
                <Sprite
                    className={styles.icon}
                    sprite={sprite}
                />

                <Heading.Node className={styles.heading}>
                    {name}
                </Heading.Node>
            </Placeholder.With>

            <Button
                className={styles.toggleButton}
                label={toggleButtonDescription}
                innerRef={toggleButtonRef}
                isActive={shouldShowExtraPanel}
                onLeftClick={toggle}
            >
                <Sprite
                    className={styles.toggleIcon}
                    sprite={ASSETS.IMAGES.SPRITE.CHANNEL_MEMBERS_ICON}
                />
            </Button>

            <Overlay.Tooltip
                leaderElementRef={toggleButtonRef}
                preferredAlignment='bottom'
            >
                {toggleButtonDescription}
            </Overlay.Tooltip>
        </TopBar>
    );
};

const MemberList: FC = () => {
    return <div>member list</div>;
};

export const TMP: FC = () => {
    return (
        <MobileMenu.Provider>
            <ChatPageTemplate.Node
                header={<Header/>}
                main={(
                    <div className='size-full'>
                        <div>feed</div>
                        <div>message input</div>
                    </div>
                )}
                extra={<MemberList/>}
            />
        </MobileMenu.Provider>
    );

    // return (
    //     <div className='flex flex-col gap-2'>
    //         <div className='text-center'>wow</div>

    //         <Scrollable>
    //             <div className='flex flex-col gap-2'>
    //             </div>
    //         </Scrollable>
    //     </div>
    // );
};