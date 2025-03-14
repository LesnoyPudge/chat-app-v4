import { createStyles } from '@/utils';
import { Button, Overlay, Scrollable, Separator, Sprite, Tab } from '@/components';
import { FC } from 'react';
import { ContextSelectable, Heading } from '@lesnoypudge/utils-react';
import { FriendsPanelTabs, FriendsPanelTabsContext } from '../../FriendsPanel';
import { useTrans } from '@/hooks';
import { TopBar } from '@/router/layouts/bundled';
import { ASSETS } from '@/generated/ASSETS';
// import { AddFriendModal } from "./components";



const styles = createStyles({
    content: 'flex items-center px-2',
    icon: 'size-6 fill-icon-300',
    heading: 'ml-2 shrink-0 text-17-22 font-semibold text-color-primary',
    tabList: 'flex shrink-0 gap-4',
    button: `
        _py-0.5
        shrink-0 
        rounded 
        px-2
        font-medium
        text-color-secondary
        transition-all 
        duration-75 
        data-[active=true]:bg-primary-active 
        data-[active=true]:text-color-primary
        hover-focus-visible:bg-primary-active
        hover-focus-visible:text-color-primary
    `,
});

const separatorProps: Separator.Props = {
    spacing: 16,
    orientation: 'vertical',
    length: 24,
    thickness: 2,
};

export const Navigation: FC = () => {
    const { t } = useTrans();
    const {
        changeTab,
        isActive,
        tabProps,
        orientation,
    } = ContextSelectable.useProxy(FriendsPanelTabsContext);
    const controls = Overlay.useControls();

    const buttonText: Record<keyof FriendsPanelTabs, string> = {
        all: t('FriendsPanel.Navigation.all.button.label'),
        blocked: t('FriendsPanel.Navigation.blocked.button.label'),
        pending: t('FriendsPanel.Navigation.pending.button.label'),
        online: t('FriendsPanel.Navigation.online.button.label'),
    };

    return (
        <TopBar withMobileButton>
            <Scrollable
                direction={orientation}
                autoHide
                withoutOppositeGutter
                size='small'
            >
                <div className={styles.content}>
                    <Sprite
                        className={styles.icon}
                        sprite={ASSETS.IMAGES.SPRITE.FRIEND_ICON}
                    />

                    <Heading.Node className={styles.heading}>
                        {t('FriendsPanel.Navigation.heading')}
                    </Heading.Node>

                    <Separator {...separatorProps}/>

                    <Tab.List
                        className={styles.tabList}
                        label={t('FriendsPanel.Navigation.tablist.label')}
                        context={FriendsPanelTabsContext}
                    >
                        {(itemProps) => (
                            <Button
                                className={styles.button}
                                size='small'
                                innerRef={itemProps.itemRef}
                                tabIndex={itemProps.tabIndex}
                                isActive={isActive[itemProps.item]}
                                {...tabProps[itemProps.item]}
                                onLeftClick={changeTab[itemProps.item]}
                            >
                                {buttonText[itemProps.item]}
                            </Button>
                        )}
                    </Tab.List>


                    <Separator {...separatorProps}/>

                    <Button
                        stylingPreset='brand'
                        size='small'
                        hasPopup='dialog'
                        isActive={controls.isOpen}
                        onLeftClick={controls.open}
                    >
                        {t('FriendsPanel.Navigation.addFriendButton')}
                    </Button>

                    {/* <AddFriendModal/> */}
                </div>
            </Scrollable>
        </TopBar>
    );
};