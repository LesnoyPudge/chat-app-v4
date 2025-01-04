import { FC } from 'react';
import { ServerListItem } from './components';
import { useStoreSelector } from '@redux/hooks';
import { Features } from '@redux/features';
import { Iterate, Scrollable, Separator } from '@components';
import { useKeyboardNavigation } from '@hooks';
import { useRefManager } from '@lesnoypudge/utils-react';
import { createStyles } from '@utils';
import { useTrans } from '@i18n';



const styles = createStyles({
    wrapper: 'flex flex-col',
    scrollable: 'py-2',
    list: 'flex flex-col gap-2',
});

export const ServerList: FC = () => {
    const { t } = useTrans();
    const wrapperRef = useRefManager<HTMLUListElement>(null);
    const serverIds = useStoreSelector((state) => {
        return Features.Users.StoreSelectors.selectMe()(state).servers;
    });
    const {
        getIsFocused,
        getTabIndex,
        setCurrentFocusedId,
    } = useKeyboardNavigation(wrapperRef, {
        list: serverIds,
        direction: 'vertical',
        loop: false,
    });

    const showServers = !!serverIds.length;

    return (
        <If condition={showServers}>
            <div className={styles.wrapper}>
                <Separator
                    length={32}
                    spacing={0}
                    thickness={2}
                />

                <Scrollable
                    className={styles.scrollable}
                    size='hidden'
                    followContentSize
                >
                    <ul
                        className={styles.list}
                        aria-label={t('PrimaryNavigation.ServerList.label')}
                        ref={wrapperRef}
                    >
                        <Iterate items={serverIds}>
                            {(serverId) => (
                                <ServerListItem
                                    serverId={serverId}
                                    key={serverId}
                                    isFocused={getIsFocused(serverId)}
                                    setCurrentFocusedId={setCurrentFocusedId}
                                    tabIndex={getTabIndex(serverId)}
                                />
                            )}
                        </Iterate>
                    </ul>
                </Scrollable>

                <Separator
                    length={32}
                    spacing={0}
                    thickness={2}
                />
            </div>
        </If>
    );
};