import { Avatar, Button, KeyboardNavigation, Overlay } from '@/components';
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
    const { navigateTo } = Navigator.useNavigateTo();
    const isInServer = Navigator.useIsLocation((v) => {
        return v.server({ serverId });
    });

    const server = Store.useSelector(
        Store.Servers.Selectors.selectById(serverId),
    );

    const hasNotifications = Store.useSelector(
        Store.Servers.Selectors.selectHasNotificationsById(serverId),
    );

    const {
        isFocused,
        setFocusId,
        tabIndex,
    } = KeyboardNavigation.useCommonItem({
        elementRef: buttonRef,
        itemId: serverId,
    });

    const navigateToServer = useFunction(() => {
        navigateTo.server({ serverId });
    });

    const isActive = isInServer || isFocused;

    return (
        <WrapperWithBullet
            isActive={isActive}
            withNotifications={hasNotifications}
        >
            <Button
                className={sharedStyles.button}
                tabIndex={tabIndex}
                label={server?.name}
                role='menuitem'
                isActive={isActive}
                innerRef={buttonRef}
                onLeftClick={navigateToServer}
                onAnyClick={setFocusId}
            >
                <Avatar.Server
                    className={cn(
                        sharedStyles.avatar.base,
                        isActive && sharedStyles.avatar.active,
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