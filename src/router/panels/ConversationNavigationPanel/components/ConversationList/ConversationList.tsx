import { ListVariants, Scrollable } from '@/components';
import { FC } from 'react';
import { createStyles } from '@/utils';
import { Heading, useRefManager } from '@lesnoypudge/utils-react';
import { useTrans } from '@/hooks';
import { Features } from '@/redux/features';
import { useSliceSelector, useStoreSelector } from '@/redux/hooks';
import { ConversationItem } from './components';



const styles = createStyles({
    wrapper: 'flex flex-col pt-6',
    heading: 'px-3.5 pb-4 text-xs font-semibold uppercase text-color-base',
    list: 'flex flex-col gap-1 pb-4 pt-1',
});

export const ConversationList: FC = () => {
    const listRef = useRefManager<HTMLUListElement>(null);
    const { t } = useTrans();

    const conversationIds = useStoreSelector(
        Features.Conversations.StoreSelectors.selectVisibleIds(),
    );

    const conversationIdsToFetch = useSliceSelector(
        Features.Conversations.Slice,
        Features.Conversations.Slice.selectors.selectUndefinedIdsByIds(
            conversationIds,
        ),
    );

    Features.Conversations.Api.useGetManyDeepQuery({
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
                            <ListVariants.Variant1.List
                                items={conversationIds}
                                getId={(item) => item}
                                keyboardNavigation={{
                                    wrapperRef: listRef,
                                    direction: 'vertical',
                                    loop: false,
                                }}
                            >
                                {(props) => <ConversationItem {...props}/>}
                            </ListVariants.Variant1.List>
                        </ul>
                    </Scrollable>
                </If>
            </Heading.Provider>
        </div>
    );
};