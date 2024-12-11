import { createStyles } from '@utils';
import { WHITESPACE } from '@vars';
import { FC } from 'react';



const styles = createStyles({
    base: 'text-[0px]',
});

export const InlineChromiumBugfix: FC = () => {
    return (
        <span
            className={styles.base}
            contentEditable={false}
        >
            {WHITESPACE}
        </span>
    );
};