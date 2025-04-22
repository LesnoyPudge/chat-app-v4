import { Avatar, Button, KeyboardNavigation, MobileMenu, Overlay } from '@/components';
import { useFunction, useRefManager, withDisplayName } from '@lesnoypudge/utils-react';
import { cn } from '@/utils';
import { WrapperWithBullet } from '../../../WrapperWithBullet';
import { sharedStyles } from '../../../../sharedStyles';
import { Navigator, Store } from '@/features';
import { ServerContextMenu } from './components';
import { decorate } from '@lesnoypudge/macro';
import { FC, memo } from 'react';



export namespace ServerListItem {
    export type Props = {
        serverId: string;
    };
}

decorate(withDisplayName, 'ServerListItem', decorate.target);
decorate(memo, decorate.target);

export const ServerListItem: FC<ServerListItem.Props> = ({
    serverId,
}) => {
    const buttonRef = useRefManager<HTMLButtonElement>(null);
    const { closeMenu } = MobileMenu.useMobileMenu();
    const isInServer = Navigator.useIsLocation((v) => v.server({ serverId }));
    const {
        tryNavigateToChannel,
    } = Navigator.useTryNavigateToChannel(serverId);

    const server = Store.useSelector(
        Store.Servers.Selectors.selectById(serverId),
    );

    const hasNotifications = Store.useSelector(
        Store.Servers.Selectors.selectHasNotificationsById(serverId),
    );

    const { setId, tabIndex } = KeyboardNavigation.useCommonItem({
        elementRef: buttonRef,
        itemId: serverId,
    });

    const navigateToServerOrChannel = useFunction(() => {
        tryNavigateToChannel();

        if (isInServer) closeMenu();
    });

    return (
        <WrapperWithBullet
            isActive={isInServer}
            withNotifications={hasNotifications}
        >
            <Button
                className={sharedStyles.button}
                tabIndex={tabIndex}
                label={server?.name}
                isActive={isInServer}
                innerRef={buttonRef}
                onLeftClick={navigateToServerOrChannel}
                onAnyClick={setId}
            >
                <Avatar.Server
                    className={cn(
                        sharedStyles.avatar.base,
                        isInServer && sharedStyles.avatar.active,
                    )}
                    name={server?.name}
                    avatar={server?.avatar}
                />
            </Button>

            <If condition={!!server}>
                <Overlay.Tooltip
                    preferredAlignment='right'
                    leaderElementRef={buttonRef}
                >
                    {server?.name}
                </Overlay.Tooltip>

                <ServerContextMenu
                    serverId={serverId}
                    leaderElementRef={buttonRef}
                />
            </If>
        </WrapperWithBullet>
    );
};