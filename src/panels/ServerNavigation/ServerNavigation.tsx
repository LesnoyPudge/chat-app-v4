import { createStyles } from '@utils';
import { FC } from 'react';
import { Header, AddChannel, ChannelList } from './components';



const styles = createStyles({
    wrapper: 'flex flex-col',
});

export const ServerNavigation: FC = () => {
    return (
        <nav className={styles.wrapper}>
            <Header/>

            <AddChannel/>

            <ChannelList/>
        </nav>
    );
};