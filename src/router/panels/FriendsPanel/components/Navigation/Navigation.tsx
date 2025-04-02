import { createStyles } from '@/utils';
import { Button, KeyboardNavigation, Overlay, Scrollable, Separator, Sprite, Tab } from '@/components';
import { FC, PropsWithChildren, useRef } from 'react';
import { ContextSelectable, Heading } from '@lesnoypudge/utils-react';
import { FriendsPanelTabs, FriendsPanelTabsContext } from '../../FriendsPanel';
import { useTrans } from '@/hooks';
import { TopBar } from '@/router/layouts/bundled';
import { ASSETS } from '@/generated/ASSETS';
// import { AddFriendModal } from "./components";



const styles = createStyles({
    topBar: 'px-2',
    content: 'flex h-8 min-w-max items-center px-2',
    icon: 'size-6 fill-icon-300',
    heading: 'ml-2 text-17-22 font-semibold text-color-primary',
    tabList: 'flex gap-4',
    button: `
        h-full
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

type ItemProps = (
    PropsWithChildren
    & {
        tabName: keyof FriendsPanelTabs;
    }
);

const Item: FC<ItemProps> = ({
    tabName,
    children,
}) => {
    const elementRef = useRef<HTMLButtonElement>(null);
    const {
        changeTab,
        isActive,
        tabProps,
    } = ContextSelectable.useProxy(FriendsPanelTabsContext);

    const {
        setFocusId,
        tabIndex,
    } = KeyboardNavigation.useCommonItem({
        itemId: tabName,
        elementRef,
    });

    return (
        <Button
            className={styles.button}
            size='small'
            innerRef={elementRef}
            tabIndex={tabIndex}
            isActive={isActive[tabName]}
            onLeftClick={changeTab[tabName]}
            onAnyClick={setFocusId}
            {...tabProps[tabName]}
        >
            {children}
        </Button>
    );
};

export const Navigation: FC = () => {
    const { t } = useTrans();
    const {
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
        <TopBar
            className={styles.topBar}
            withMobileButton
        >
            <Scrollable
                direction={orientation}
                autoHide
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
                        {(tabName) => (
                            <Item tabName={tabName}>
                                {buttonText[tabName]}
                            </Item>
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