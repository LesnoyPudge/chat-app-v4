import { createStyles } from '@/utils';
import { FC } from 'react';
import { UserButtons, UserInfo } from './components';



const styles = createStyles({
    wrapper: `
        mt-auto 
        flex 
        h-[52px] 
        shrink-0 
        items-center 
        gap-2 
        bg-primary-400 
        px-2
        py-0
    `,
});

export const UserToolBar: FC = () => {
    return (
        <div className={styles.wrapper}>
            <UserInfo/>

            <UserButtons/>
        </div>
    );
};