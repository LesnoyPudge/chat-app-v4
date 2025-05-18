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
import { MemberItem } from './components';



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

export const MembersTab: FC = () => {
    const { t } = useTrans();
    const wrapperRef = useRefManager<HTMLUListElement>(null);
    const search = SearchBar.useControls('');
    const { serverId } = useServerSettingsDialogContextProxy();

    const {
        data,
        isLoading,
        isSuccess,
    } = Store.Servers.Api.useServerGetMembersQuery({
        serverId,
        limit: null,
    });

    const members = data?.User;

    const filteredMemberIds = useMemo(() => {
        if (!members) return [];

        const _members = search.deferredValue ? members.filter((member) => {
            return member.name.toLowerCase().includes(
                search.deferredValue.toLowerCase(),
            );
        }) : members;

        return _members.map(({ id }) => id);
    }, [members, search.deferredValue]);

    const shouldShowPlaceholder = isLoading || !isSuccess;
    const shouldShowNotFound = (
        !isLoading
        && isSuccess
        && !!search.deferredValue
        && !filteredMemberIds.length
    );
    const shouldShowList = (
        !isLoading
        && isSuccess
        && !!filteredMemberIds.length
    );

    return (
        <ServerSettingsDialogTabs.Panel.MembersTab>
            <DialogBlocks.FullScreen.TabTitle>
                {t('ServerSettingsDialog.MembersTab.title')}
            </DialogBlocks.FullScreen.TabTitle>

            <div className={styles.infoWrapper}>
                <div className={styles.info}>
                    <Placeholder.With
                        className={styles.infoPlaceholder}
                        reveal={members}
                    >
                        {(members) => (
                            <span>
                                {t('ServerSettingsDialog.MembersTab.membersTotalCount', {
                                    membersCount: members.length,
                                })}
                            </span>
                        )}
                    </Placeholder.With>

                    <Placeholder.With
                        className={styles.infoPlaceholder}
                        reveal={members}
                    >
                        <span>
                            {t('ServerSettingsDialog.MembersTab.membersFilteredCount', {
                                filteredCount: filteredMemberIds.length,
                            })}
                        </span>
                    </Placeholder.With>
                </div>

                <SearchBar.Node
                    className={styles.searchBar}
                    placeholder={t('ServerSettingsDialog.MembersTab.search.placeholder')}
                    label={t('ServerSettingsDialog.MembersTab.search.label')}
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
                        {t('ServerSettingsDialog.MembersTab.notFound')}
                    </div>
                </If>

                <If condition={shouldShowList}>
                    <Scrollable className={styles.scrollable}>
                        <ul ref={wrapperRef}>
                            <VirtualList.Node
                                items={filteredMemberIds}
                                getId={(v) => v}
                                wrapperRef={wrapperRef}
                            >
                                {(id) => <MemberItem userId={id}/>}
                            </VirtualList.Node>
                        </ul>
                    </Scrollable>
                </If>
            </div>
        </ServerSettingsDialogTabs.Panel.MembersTab>
    );
};