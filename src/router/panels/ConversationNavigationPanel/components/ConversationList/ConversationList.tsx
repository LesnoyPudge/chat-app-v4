import { Scrollable, VirtualList } from '@/components';
import { FC } from 'react';
import { createStyles } from '@/utils';
import { Heading, useRefManager } from '@lesnoypudge/utils-react';
import { useTrans } from '@/hooks';
import { ConversationItem } from './components';
import { Store } from '@/features';



const styles = createStyles({
    wrapper: 'flex flex-col pt-6',
    heading: 'px-3.5 pb-4 text-xs font-semibold uppercase text-color-base',
    list: 'flex flex-col pb-4 pt-1',
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
                            <VirtualList.Node
                                items={conversationIds}
                                getId={(id) => id}
                                wrapperRef={listRef}
                                itemSize={46}
                                itemMargin={4}
                            >
                                {(id) => (
                                    <ConversationItem id={id}/>
                                )}
                            </VirtualList.Node>
                        </ul>
                    </Scrollable>
                </If>
            </Heading.Provider>
        </div>
    );
};