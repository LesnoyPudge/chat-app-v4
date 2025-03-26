import { KeyboardNavigation, Scrollable, VirtualRender } from '@/components';
import { FC } from 'react';
import { createStyles } from '@/utils';
import { Heading, useRefManager } from '@lesnoypudge/utils-react';
import { useTrans } from '@/hooks';
import { ConversationItem } from './components';
import { Store } from '@/features';



const styles = createStyles({
    wrapper: 'flex flex-col pt-6',
    heading: 'px-3.5 pb-4 text-xs font-semibold uppercase text-color-base',
    list: 'flex flex-col gap-1 pb-4 pt-1',
});

export const ConversationList: FC = () => {
    const listRef = useRefManager<HTMLUListElement>(null);
    const { t } = useTrans();

    const conversationIds = Store.useSelector(
        Store.Conversations.Selectors.selectVisibleIds,
    );

    const conversationIdsToFetch = Store.useSelector(
        Store.Conversations.Selectors.selectUndefinedIdsByIds(
            ...conversationIds,
        ),
    );

    Store.Conversations.Api.useConversationGetManyDeepQuery({
        conversationIds: conversationIdsToFetch,
    }, { skip: !conversationIdsToFetch.length });

    const {
        setVirtualIndexes,
        virtualList,
    } = VirtualRender.useVirtualArray(conversationIds);

    return (
        <div className={styles.wrapper}>
            <Heading.Node className={styles.heading}>
                {t('ConversationNavigation.ConversationList.heading')}
            </Heading.Node>

            <Heading.Provider>
                <If condition={!!conversationIds.length}>
                    <Scrollable
                        size='small'
                        autoHide
                    >
                        <ul
                            className={styles.list}
                            aria-label={t('ConversationNavigation.ConversationList.label')}
                            ref={listRef}
                        >
                            <KeyboardNavigation.Provider
                                list={virtualList}
                                wrapperRef={listRef}
                            >
                                <VirtualRender.List
                                    items={conversationIds}
                                    getId={(id) => id}
                                    indexesShift={0}
                                    onViewportIndexesChange={setVirtualIndexes}
                                >
                                    {(id) => (
                                        <ConversationItem id={id}/>
                                    )}
                                </VirtualRender.List>
                            </KeyboardNavigation.Provider>
                        </ul>
                    </Scrollable>
                </If>
            </Heading.Provider>
        </div>
    );
};