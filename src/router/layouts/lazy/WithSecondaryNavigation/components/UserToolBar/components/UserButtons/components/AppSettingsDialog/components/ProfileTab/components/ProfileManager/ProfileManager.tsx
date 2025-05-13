import { FC } from 'react';
import { Banner, Header, Content } from './components';
import { createStyles } from '@/utils';
import { Heading } from '@lesnoypudge/utils-react';



const styles = createStyles({
    wrapper: 'flex flex-col',
    userInfo: 'flex flex-col gap-4 rounded-b-lg bg-primary-500 p-4',
});

export const ProfileManager: FC = () => {
    return (
        <Heading.Provider>
            <div className={styles.wrapper}>
                <Banner/>

                <div className={styles.userInfo}>
                    <Header/>

                    <Content/>
                </div>
            </div>
        </Heading.Provider>
    );
};