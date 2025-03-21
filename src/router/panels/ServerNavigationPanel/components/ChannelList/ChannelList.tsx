import { FC } from 'react';
import { ChannelItem } from './components';
import { createStyles } from '@/utils';
import { useValidatedParams, useTrans } from '@/hooks';
import { useRefManager } from '@lesnoypudge/utils-react';
import { ListVariants, Scrollable } from '@/components';
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
                <ListVariants.Variant1.List
                    items={server?.channels ?? []}
                    getId={(id) => id}
                    keyboardNavigation={{
                        direction: 'vertical',
                        loop: false,
                        wrapperRef,
                    }}
                >
                    {ChannelItem}
                </ListVariants.Variant1.List>
            </ul>
        </Scrollable>
    );
};