import { createStyles } from '@utils';
import { FC } from 'react';
import { Header, ConversationList } from './components';



const styles = createStyles({
    wrapper: 'flex grow flex-col',
});

export const ConversationNavigation: FC = () => {
    return (
        <nav className={styles.wrapper}>
            <Header/>

            <ConversationList/>
        </nav>
    );
};