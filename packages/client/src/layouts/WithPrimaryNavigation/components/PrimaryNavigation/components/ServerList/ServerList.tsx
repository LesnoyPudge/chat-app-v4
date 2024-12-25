import { FC } from 'react';
import { ServerListItem } from './components';
import { useSliceSelector } from '@redux/hooks';
import { Features } from '@redux/features';
import { Iterate, Scrollable, Separator } from '@components';



export const ServerList: FC = () => {
    // const { myLocationIs, navigateTo } = useNavigator();
    // const ids = useMemoSelector((s) => AppSelectors.selectMe(s).channels, []);
    // const channels = useMemoSelector(ChannelSelectors.selectByIds(ids), [ids]);
    // const channelsRef = useLatest(channels);
    // const keyboardNavigation = useKeyboardNavigation(channelsRef);

    const serverIds = useSliceSelector(
        Features.App.Slice,
        (state) => Features.App.Slice.selectors.selectAuthorizedUser()(
            state,
        ).servers,
    );

    const showServers = !!serverIds.length;

    return (
        <If condition={showServers}>
            <Separator length='50%' spacing={0}/>

            <Scrollable
                className={styles.scrollbar}
                size='hidden'
                followContentSize
            >
                <ul
                    className={styles.list}
                    aria-label='Список каналов'
                    ref={keyboardNavigation.setRoot}
                >
                    <Iterate items={serverIds}></Iterate>
                    <List list={ids}>
                        {(channelId) => (
                            <EntityContextProvider.Channel id={channelId}>
                                {(channel) => {
                                    const isInChannel = myLocationIs.channel(channelId);
                                    const navigateToChannel = () => navigateTo.channel(channelId);

                                    const childrenArgs: ChildrenArgs = [
                                        channelId,
                                        channel,
                                        isInChannel,
                                        navigateToChannel,
                                        keyboardNavigation,
                                    ];

                                    return (
                                        <li>
                                            <MoveFocusInside enabled={keyboardNavigation.getIsFocused(channelId)}>
                                                <WrapperWithBullet isActive={isInChannel}>
                                                    <ChildrenAsNodeOrFunction args={childrenArgs}>
                                                        {children}
                                                    </ChildrenAsNodeOrFunction>
                                                </WrapperWithBullet>
                                            </MoveFocusInside>
                                        </li>
                                    );
                                }}
                            </EntityContextProvider.Channel>
                        )}
                    </List>
                </ul>
            </Scrollable>

            <Separator length='50%' spacing={0}/>
        </If>
    );
};