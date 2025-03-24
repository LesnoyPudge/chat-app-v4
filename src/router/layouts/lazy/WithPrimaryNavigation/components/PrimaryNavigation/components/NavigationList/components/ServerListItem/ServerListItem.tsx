import { Avatar, Button, Overlay } from '@/components';
import { useKeyboardNavigation } from '@/hooks';
import { Focus, useFunction, useRefManager, useScrollIntoView, withDisplayName } from '@lesnoypudge/utils-react';
import { cn } from '@/utils';
import { WrapperWithBullet } from '../../../WrapperWithBullet';
import { sharedStyles } from '../../../../sharedStyles';
import { Navigator, Store } from '@/features';
import { ServerContextMenu } from './components';
import { decorate } from '@lesnoypudge/macro';
import { FC, memo } from 'react';



export namespace ServerListItem {
    export type Props = (
        Pick<
            useKeyboardNavigation.Return,
            'setCurrentFocusedId'
        >
        & {
            serverId: string;
            isFocused: boolean;
            tabIndex: number;
        }
    );
}

decorate(withDisplayName, 'ServerListItem', decorate.target);
decorate(memo, decorate.target);

export const ServerListItem: FC<ServerListItem.Props> = ({
    serverId,
    isFocused,
    tabIndex,
    setCurrentFocusedId,
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

    Focus.useMoveFocusInside({
        containerRef: buttonRef,
        isEnabled: isFocused,
    });

    useScrollIntoView(buttonRef, {
        enabled: isFocused,
    });

    const setFocused = useFunction(() => {
        setCurrentFocusedId(serverId);
    });

    const navigateToServer = useFunction(() => {
        setFocused();
        navigateTo.server({ serverId });
    });

    return (
        <WrapperWithBullet
            isActive={isInServer}
            withNotifications={hasNotifications}
        >
            <Button
                className={cn(
                    sharedStyles.button.base,
                    isInServer && sharedStyles.button.active,
                )}
                tabIndex={tabIndex}
                label={server?.name}
                role='menuitem'
                isActive={isInServer}
                innerRef={buttonRef}
                onLeftClick={navigateToServer}
                onAnyClick={setFocused}
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