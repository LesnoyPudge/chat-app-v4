import { createStyles } from '@/utils';
import { FC } from 'react';
import { Header, AddChannel, ChannelList } from './components';
import { Navigator } from '@/features';



const styles = createStyles({
    wrapper: 'flex flex-col',
});

export const ServerNavigationPanel: FC = () => {
    const { serverId } = Navigator.useParams('server');

    return (
        <nav className={styles.wrapper} key={serverId}>
            <Header/>

            <AddChannel/>

            <ChannelList/>
        </nav>
    );
};