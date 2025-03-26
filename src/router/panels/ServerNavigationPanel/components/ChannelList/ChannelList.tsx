import { FC } from 'react';
import { ChannelItem } from './components';
import { createStyles } from '@/utils';
import { useTrans } from '@/hooks';
import { useRefManager } from '@lesnoypudge/utils-react';
import { Scrollable, VirtualList } from '@/components';
import { Navigator, Store } from '@/features';



const styles = createStyles({
    wrapper: 'mt-4',
    list: 'flex flex-col',
});

export const ChannelList: FC = () => {
    const wrapperRef = useRefManager<HTMLUListElement>(null);
    const { serverId } = Navigator.useParams('server');
    const { t } = useTrans();

    const server = Store.useSelector(
        Store.Servers.Selectors.selectById(serverId),
    );

    return (
        <Scrollable
            className={styles.wrapper}
            size='small'
            autoHide
        >
            <ul
                className={styles.list}
                aria-label={t('ServerNavigation.ChannelList.label')}
                ref={wrapperRef}
            >
                <VirtualList
                    items={server?.channels}
                    getId={(id) => id}
                    wrapperRef={wrapperRef}
                    itemSize={36}
                    itemMargin={4}
                >
                    {(channelId) => (
                        <ChannelItem channelId={channelId}/>
                    )}
                </VirtualList>
            </ul>
        </Scrollable>
    );
};