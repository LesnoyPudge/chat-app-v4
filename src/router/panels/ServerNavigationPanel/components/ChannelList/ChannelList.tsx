import { FC } from 'react';
import { ChannelItem } from './components';
import { createStyles } from '@/utils';
import { useValidatedParams, useTrans } from '@/hooks';
import { useRefManager } from '@lesnoypudge/utils-react';
import { KeyboardNavigation, Scrollable, VirtualRender } from '@/components';
import { Store } from '@/features';



const styles = createStyles({
    wrapper: 'mt-4',
    list: 'flex flex-col gap-1',
});

export const ChannelList: FC = () => {
    const wrapperRef = useRefManager<HTMLUListElement>(null);
    const { serverId } = useValidatedParams('server');
    const { t } = useTrans();

    const server = Store.useSelector(
        Store.Servers.Selectors.selectById(serverId),
    );

    const {
        setVirtualIndexes,
        virtualList,
    } = VirtualRender.useVirtualArray(server?.channels);

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

                <KeyboardNavigation.Provider
                    list={virtualList}
                    wrapperRef={wrapperRef}
                >
                    <VirtualRender.List
                        items={server?.channels}
                        getId={(v) => v}
                        indexesShift={0}
                        onViewportIndexesChange={setVirtualIndexes}
                    >
                        {(channelId) => (
                            <ChannelItem channelId={channelId}/>
                        )}
                    </VirtualRender.List>
                </KeyboardNavigation.Provider>
            </ul>
        </Scrollable>
    );
};