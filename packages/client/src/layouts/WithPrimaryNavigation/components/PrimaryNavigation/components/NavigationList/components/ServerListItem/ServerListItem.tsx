import { Avatar, Button, ContextMenu, Tooltip } from '@components';
import { Navigator } from '@entities';
import { useKeyboardNavigation } from '@hooks';
import { Focus, useFunction, useRefManager } from '@lesnoypudge/utils-react';
import { cn } from '@utils';
import { FC } from 'react';
import { WrapperWithBullet } from '../../../WrapperWithBullet';
import { Features } from '@redux/features';
import { useSliceSelector, useStoreSelector } from '@redux/hooks';
import { sharedStyles } from '../../../../sharedStyles';
import { ServerContextMenu } from '@contextMenus';



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

export const ServerListItem: FC<ServerListItem.Props> = ({
    serverId,
    isFocused,
    tabIndex,
    setCurrentFocusedId,
}) => {
    const buttonRef = useRefManager<HTMLButtonElement>(null);
    const { myLocationIs, navigateTo } = Navigator.useNavigator();
    const isInServer = myLocationIs.server({ serverId });

    const server = useSliceSelector(
        Features.Servers.Slice,
        Features.Servers.Slice.selectors.selectById(serverId),
    );

    const notificationsCount = useStoreSelector(
        Features.Servers.StoreSelectors.selectNotificationCountById(serverId),
    );

    const setFocused = useFunction(() => {
        setCurrentFocusedId(serverId);
    });

    const navigateToServer = useFunction(() => {
        setFocused();
        void navigateTo.server({ serverId });
    });

    return (
        <Focus.Inside
            isEnabled={isFocused}
            containerRef={buttonRef}
        >
            <WrapperWithBullet isActive={isInServer}>
                <Button
                    className={cn(
                        sharedStyles.button.base,
                        sharedStyles.brandButton.base,
                        {
                            [sharedStyles.button.active]: isInServer,
                            [sharedStyles.brandButton.active]: isInServer,
                        },
                    )}
                    tabIndex={tabIndex}
                    label={server?.name}
                    role='menuitem'
                    isActive={isInServer}
                    isDisabled={!server}
                    innerRef={buttonRef}
                    onLeftClick={navigateToServer}
                    onAnyClick={setFocused}
                >
                    <Avatar.WithBadge.Notifications
                        count={notificationsCount}
                    >
                        <Avatar.Server
                            className={sharedStyles.avatar}
                            name={server?.name}
                            avatar={server?.avatar}
                        />
                    </Avatar.WithBadge.Notifications>
                </Button>

                <If condition={!!server}>
                    <Tooltip
                        preferredAlignment='right'
                        leaderElementRef={buttonRef}
                    >
                        {server?.name}
                    </Tooltip>

                    <ContextMenu.Wrapper
                        leaderElementRef={buttonRef}
                        preferredAlignment='right'
                    >
                        <ServerContextMenu serverId={serverId}/>
                    </ContextMenu.Wrapper>
                </If>
            </WrapperWithBullet>
        </Focus.Inside>
    );
};