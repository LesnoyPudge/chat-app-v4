import {
    DialogBlocks,
    Placeholder,
    PlaceholderList,
    Scrollable,
    SearchBar,
    Separator,
    VirtualList,
} from '@/components';
import { useTrans } from '@/hooks';
import { FC, useMemo } from 'react';
import {
    ServerSettingsDialogTabs,
    useServerSettingsDialogContextProxy,
} from '../../ServerSettingsDialog';
import { useRefManager } from '@lesnoypudge/utils-react';
import { Store } from '@/features';
import { createStyles } from '@/utils';
import { BannedItem } from './components';



const styles = createStyles({
    infoWrapper: `
        mb-5 
        flex 
        w-full 
        flex-wrap 
        items-center 
        justify-between 
        gap-4
    `,
    infoPlaceholder: 'min-w-[60px]',
    info: 'flex flex-wrap gap-4 text-color-secondary',
    searchBar: 'h-7 max-w-[300px]',
    contentWrapper: 'h-[300px] overflow-hidden',
    notFound: 'mx-auto py-4 text-center',
    scrollable: 'h-full',
});

export const BannedTab: FC = () => {
    const { t } = useTrans();
    const wrapperRef = useRefManager<HTMLUListElement>(null);
    const search = SearchBar.useControls('');
    const { serverId } = useServerSettingsDialogContextProxy();

    const {
        data,
        isLoading,
        isSuccess,
    } = Store.Servers.Api.useServerGetBannedUsersQuery({
        serverId,
        limit: null,
    });

    const users = data?.User;

    const filteredUserIds = useMemo(() => {
        if (!users) return [];

        const _members = search.deferredValue ? users.filter((member) => {
            return member.name.toLowerCase().includes(
                search.deferredValue.toLowerCase(),
            );
        }) : users;

        return _members.map(({ id }) => id);
    }, [users, search.deferredValue]);

    const shouldShowPlaceholder = isLoading || !isSuccess;
    const shouldShowNotFound = (
        !isLoading
        && isSuccess
        && !!search.deferredValue
        && !filteredUserIds.length
    );
    const shouldShowList = (
        !isLoading
        && isSuccess
        && !!filteredUserIds.length
    );

    return (
        <ServerSettingsDialogTabs.Panel.BannedTab>
            <DialogBlocks.FullScreen.TabTitle>
                {t('ServerSettingsDialog.BannedTab.title')}
            </DialogBlocks.FullScreen.TabTitle>

            <div className={styles.infoWrapper}>
                <div className={styles.info}>
                    <Placeholder.With
                        className={styles.infoPlaceholder}
                        reveal={users}
                    >
                        {(users) => (
                            <span>
                                {t('ServerSettingsDialog.BannedTab.totalCount', {
                                    totalCount: users.length,
                                })}
                            </span>
                        )}
                    </Placeholder.With>

                    <Placeholder.With
                        className={styles.infoPlaceholder}
                        reveal={users}
                    >
                        <span>
                            {t('ServerSettingsDialog.BannedTab.filteredCount', {
                                filteredCount: filteredUserIds.length,
                            })}
                        </span>
                    </Placeholder.With>
                </div>

                <SearchBar.Node
                    className={styles.searchBar}
                    placeholder={t('ServerSettingsDialog.BannedTab.search.placeholder')}
                    label={t('ServerSettingsDialog.BannedTab.search.label')}
                    {...search}
                />
            </div>

            <Separator spacing={20} thickness={2} length='100%'/>

            <div className={styles.contentWrapper}>
                <If condition={shouldShowPlaceholder}>
                    <PlaceholderList
                        count={40}
                        gap={2}
                        itemSize={40}
                    />
                </If>

                <If condition={shouldShowNotFound}>
                    <div className={styles.notFound}>
                        {t('ServerSettingsDialog.BannedTab.notFound')}
                    </div>
                </If>

                <If condition={shouldShowList}>
                    <Scrollable className={styles.scrollable}>
                        <ul ref={wrapperRef}>
                            <VirtualList.Node
                                items={filteredUserIds}
                                getId={(v) => v}
                                wrapperRef={wrapperRef}
                            >
                                {(id) => <BannedItem userId={id}/>}
                            </VirtualList.Node>
                        </ul>
                    </Scrollable>
                </If>
            </div>
        </ServerSettingsDialogTabs.Panel.BannedTab>
    );
};