import { createStyles } from '@utils';
import { CUSTOM_STYLES } from '@vars';
import { FC } from 'react';
import { Outlet } from 'react-router';
import { PrimaryNavigation } from './components';
import { MobileMenu } from '@components';



const styles = createStyles({
    screen: `${CUSTOM_STYLES.SCREEN} flex`,
});

export const WithPrimaryNavigation: FC = () => {
    return (
        <div className={styles.screen}>
            <MobileMenu.Provider>
                <PrimaryNavigation/>

                <Outlet/>
            </MobileMenu.Provider>
        </div>
    );
};