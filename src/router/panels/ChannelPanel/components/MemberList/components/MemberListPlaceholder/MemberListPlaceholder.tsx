import { Placeholder } from '@/components';
import { createStyles } from '@/utils';
import { Iterate } from '@lesnoypudge/utils-react';
import { FC } from 'react';



const styles = createStyles({
    wrapper: `
        flex 
        size-full 
        flex-col 
        gap-0.5 
        overflow-hidden 
        px-4 
        py-5
    `,
    placeholder: 'min-h-10',
});

const placeholderItems = Array.from({ length: 40 }).map((_, i) => i);

export const MemberListPlaceholder: FC = () => {
    return (
        <div className={styles.wrapper}>
            <Iterate items={placeholderItems} getKey={(v) => v}>
                {() => <Placeholder.Node className={styles.placeholder}/>}
            </Iterate>
        </div>
    );
};