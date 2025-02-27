import { createStyles } from '@utils';
import { FC } from 'react';
import { Outlet } from 'react-router';
import { PrimaryNavigation } from './components';
import { MobileMenu } from '@components';
import { Screen } from '@router/layouts/bundled';



const styles = createStyles({
    screen: `flex`,
});

export const WithPrimaryNavigation: FC = () => {
    return (
        <Screen className={styles.screen}>
            <MobileMenu.Provider>
                <PrimaryNavigation/>

                <Outlet/>
            </MobileMenu.Provider>
        </Screen>
    );
};