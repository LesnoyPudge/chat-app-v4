import { FC } from 'react';
import { ChannelItem } from './components';
import { cn, createStyles, getHTMLElement } from '@/utils';
import { useTrans } from '@/hooks';
import { Iterate, useRefManager } from '@lesnoypudge/utils-react';
import { Placeholder, Scrollable, VirtualList } from '@/components';
import { Navigator, Store } from '@/features';



const styles = createStyles({
    wrapper: 'mt-4',
    list: 'flex flex-col',
    placeholderItem: 'h-9',
    placeholderListGap: 'gap-1',
});

const placeholderCount = Math.round(getHTMLElement.appRoot.clientHeight / 36);

export const ChannelList: FC = () => {
    const wrapperRef = useRefManager<HTMLUListElement>(null);
    const { serverId } = Navigator.useParams('server');
    const { t } = useTrans();

    const channels = Store.useSelector(
        Store.Servers.Selectors.selectChannelsById(serverId),
    );

    const shouldShowList = !!channels;
    const shouldShowPlaceholder = !shouldShowList;

    return (
        <Scrollable
            className={styles.wrapper}
            size='small'
            autoHide
        >
            <If condition={shouldShowPlaceholder}>
                <div className={cn(styles.list, styles.placeholderListGap)}>
                    <Iterate
                        count={placeholderCount}
                        getKey={(i) => i}
                    >
                        {() => (
                            <Placeholder.Node
                                className={styles.placeholderItem}
                            />
                        )}
                    </Iterate>
                </div>
            </If>

            <If condition={shouldShowList}>
                <ul
                    className={styles.list}
                    aria-label={t('ServerNavigation.ChannelList.label')}
                    ref={wrapperRef}
                >
                    <VirtualList.Node
                        items={channels}
                        getId={(id) => id}
                        wrapperRef={wrapperRef}
                        itemSize={36}
                        itemMargin={4}
                    >
                        {(channelId) => (
                            <ChannelItem channelId={channelId}/>
                        )}
                    </VirtualList.Node>
                </ul>
            </If>
        </Scrollable>
    );
};