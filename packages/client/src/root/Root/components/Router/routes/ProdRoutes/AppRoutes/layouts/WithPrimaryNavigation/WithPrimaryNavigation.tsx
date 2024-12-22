import { createStyles } from '@utils';
import { CUSTOM_STYLES } from '@vars';
import { FC } from 'react';
import { Outlet } from 'react-router';
import { PrimaryNavigation } from './components';



const styles = createStyles({
    screen: CUSTOM_STYLES.SCREEN,
});

export const WithPrimaryNavigation: FC = () => {
    return (
        <div className={styles.screen}>
            <PrimaryNavigation/>

            <Outlet/>
        </div>
    );
};