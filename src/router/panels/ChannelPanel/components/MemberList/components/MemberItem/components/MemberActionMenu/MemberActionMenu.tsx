import { Button, Overlay, ActionMenu, WithPermission } from '@/components';
import { Navigator, Store } from '@/features';
import { createWithDecorator, withDisplayName, useFunction } from '@lesnoypudge/utils-react';
import { useTrans } from '@/hooks';
import { decorate } from '@lesnoypudge/macro';



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
            label={t('ChannelPanel.MemberActionMenu.label')}
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
    const { serverId } = Navigator.useParams('channel');
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
                label={t('ChannelPanel.MemberActionMenu.sendMessage')}
                isLoading={isConversationLoading}
                onLeftClick={handleSendMessage}
            >
                {t('ChannelPanel.MemberActionMenu.sendMessage')}
            </Button>

            <WithPermission.KickMember serverId={serverId}>
                <Button
                    className={ActionMenu.styles.button}
                    {...ActionMenu.buttonProps}
                    label={t('ChannelPanel.MemberActionMenu.kickMember')}
                    onLeftClick={handleKick}
                >
                    {t('ChannelPanel.MemberActionMenu.kickMember')}
                </Button>
            </WithPermission.KickMember>

            <WithPermission.BanMember serverId={serverId}>
                <Button
                    className={ActionMenu.styles.button}
                    {...ActionMenu.buttonProps}
                    label={t('ChannelPanel.MemberActionMenu.banMember')}
                    onLeftClick={handleBan}
                >
                    {t('ChannelPanel.MemberActionMenu.banMember')}
                </Button>
            </WithPermission.BanMember>
        </ActionMenu.Wrapper>
    );
});