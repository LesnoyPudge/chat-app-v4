import { Avatar, Button, Overlay } from '@/components';
import { useKeyboardNavigation } from '@/hooks';
import { Focus, useFunction, useRefManager, useScrollIntoView } from '@lesnoypudge/utils-react';
import { cn } from '@/utils';
import { FC, memo } from 'react';
import { WrapperWithBullet } from '../../../WrapperWithBullet';
import { Features } from '@/redux/features';
import { useSliceSelector, useStoreSelector } from '@/redux/hooks';
import { sharedStyles } from '../../../../sharedStyles';
import { Navigator } from '@/features';
import { ServerContextMenu } from './components';



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

export const ServerListItem: FC<ServerListItem.Props> = memo(({
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

    const server = useSliceSelector(
        Features.Servers.Slice,
        Features.Servers.Slice.selectors.selectById(serverId),
    );

    const hasNotifications = useStoreSelector(
        Features.Servers.StoreSelectors.selectHasNotificationsById(serverId),
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
});