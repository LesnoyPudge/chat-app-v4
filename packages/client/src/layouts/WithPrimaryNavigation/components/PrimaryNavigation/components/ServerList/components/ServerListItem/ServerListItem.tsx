import { FC } from 'react';



export const ServerListItem: FC = () => {
    return (
        <>
            <Button
                className={cn(
                    styles.button.base,
                    styles.brandButton.base,
                    {
                        [styles.button.active]: isInChannel,
                        [styles.brandButton.active]: isInChannel,
                    },
                )}
                tabIndex={getTabIndex(channelId)}
                label={getTextFallback(channel?.name)}
                isLoading={!channel}
                isActive={isInChannel}
                innerRef={ref}
                onLeftClick={withFocusSet(channelId, navigateToChannel)}
                onAnyClick={withFocusSet(channelId)}
            >
                <ChannelAvatar
                    className={styles.channelAvatar}
                    avatar={getReadImagePath(channel?.avatar)}
                    name={channel?.name}
                />
            </Button>

            <Tooltip
                preferredAlignment='right'
                leaderElementRef={ref}
            >
                <>{getTextFallback(channel?.name)}</>
            </Tooltip>

            <OverlayContextProvider>
                <ToDo>
                    <ContextMenu
                        preferredAlignment='right'
                        leaderElementRef={ref}
                    >
                        <>menu</>

                        <Button>
                            <>1</>
                        </Button>

                        <Button>
                            <>2</>
                        </Button>
                    </ContextMenu>
                </ToDo>
            </OverlayContextProvider>
        </>
    );
};