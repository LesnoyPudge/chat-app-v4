import { Button, Overlay, Placeholder, Scrollable, Sprite, VirtualList, ActionMenu, WithPermission } from '@/components';
import { FC } from 'react';
import { ChatPageTemplate } from '@/router/templates';
import { Navigator, Store } from '@/features';
import { ASSETS } from '@/generated/ASSETS';
import { TopBar } from '@/router/layouts/bundled';
import { Heading, useRefManager, createWithDecorator, withDisplayName, useFunction, Iterate } from '@lesnoypudge/utils-react';
import { createStyles } from '@/utils';
import { useTrans } from '@/hooks';
import { decorate } from '@lesnoypudge/macro';


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

const {
    withDecorator,
} = createWithDecorator<Overlay.Menu.Types.PublicProps>(({
    children,
    controls,
    leaderElementOrRectRef,
}) => {
    const { t } = useTrans();

    return (
        <Overlay.Menu.Provider
            label={t('MemberActionMenu.label')}
            controls={controls}
            preferredAlignment='bottom'
            leaderElementOrRectRef={leaderElementOrRectRef}
            centered
        >
            <Overlay.Menu.Wrapper>
                {children}
            </Overlay.Menu.Wrapper>
        </Overlay.Menu.Provider>
    );
});

export namespace MemberActionMenu {
    export type Props = {
        userId: string;
    };
}

decorate(withDisplayName, 'MemberActionMenu', decorate.target);

export const MemberActionMenu = withDecorator<MemberActionMenu.Props>(({
    userId,
}) => {
    const { t } = useTrans();
    const {
        isConversationLoading,
        tryNavigateToConversation,
    } = Navigator.useTryNavigateToConversation();

    const [
        kickTrigger,
        kickHelpers,
    ] = Store.Servers.Api.useServerKickMemberMutation();

    const [
        banTrigger,
        banHelpers,
    ] = Store.Servers.Api.useServerBanMemberMutation();

    const handleSendMessage = useFunction(() => {
        tryNavigateToConversation(userId);
    });

    const handleKick = useFunction(() => {
        if (kickHelpers.isLoading) return;

        void kickTrigger({ serverId, targetId: userId });
    });

    const handleBan = useFunction(() => {
        if (banHelpers.isLoading) return;

        void banTrigger({ serverId, targetId: userId });
    });

    return (
        <ActionMenu.Wrapper>
            <Button
                className={ActionMenu.styles.button}
                {...ActionMenu.buttonProps}
                label={t('MemberActionMenu.sendMessage')}
                isLoading={isConversationLoading}
                onLeftClick={handleSendMessage}
            >
                {t('MemberActionMenu.sendMessage')}
            </Button>

            <WithPermission.KickMember serverId={serverId}>
                <Button
                    className={ActionMenu.styles.button}
                    {...ActionMenu.buttonProps}
                    label={t('MemberActionMenu.kickMember')}
                    onLeftClick={handleKick}
                >
                    {t('MemberActionMenu.kickMember')}
                </Button>
            </WithPermission.KickMember>

            <WithPermission.BanMember serverId={serverId}>
                <Button
                    className={ActionMenu.styles.button}
                    {...ActionMenu.buttonProps}
                    label={t('MemberActionMenu.banMember')}
                    onLeftClick={handleBan}
                >
                    {t('MemberActionMenu.banMember')}
                </Button>
            </WithPermission.BanMember>
        </ActionMenu.Wrapper>
    );
});

const placeholderItems = Array.from({ length: 40 }).map((_, i) => i);

const MemberListPlaceholder: FC = () => {
    return (
        <div className='flex h-full flex-col gap-0.5 overflow-hidden px-4 py-5'>
            <Iterate items={placeholderItems} getKey={(v) => v}>
                {() => <Placeholder.Node height={42}/>}
            </Iterate>
        </div>
    );
};

const MemberList: FC = () => {
    const wrapperRefManager = useRefManager<HTMLDivElement>(null);

    const onlineMemberIds = Store.useSelector(
        Store.Servers.Selectors.selectOnlineMemberIdsById(serverId),
    );

    const offlineMemberIds = Store.useSelector(
        Store.Servers.Selectors.selectOfflineMemberIdsById(serverId),
    );

    const { isLoading } = Store.Servers.Api.useServerGetMembersQuery({
        serverId,
        // omit load on scroll for simplicity
        limit: Infinity,
    });

    const ids = [...onlineMemberIds, ...offlineMemberIds];

    if (isLoading || !ids.length) {
        return <MemberListPlaceholder/>;
    }

    return (
        <Scrollable className='h-full'>
            <div
                className='flex flex-col gap-0.5 px-2 py-5'
                role='list'
                aria-label='member list'
                ref={wrapperRefManager}
            >
                <VirtualList.Node
                    items={ids}
                    getId={(v) => v}
                    itemMargin={0}
                    itemSize={20}
                    wrapperRef={wrapperRefManager}
                >
                    {(userId) => (
                        <Button className='h-[42px]' label='Действия с участником сервера {{name}}'>
                            {userId}
                        </Button>
                    )}
                </VirtualList.Node>
            </div>
        </Scrollable>
    );
};

export const ChannelPanel: FC = () => {
    return (
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
    );
};