import { createStyles } from '@utils';
import { FC } from 'react';



const styles = createStyles({
    wrapper: 'grid place-items-center',
    inner: `
        flex
        max-h-[90dvh]
        w-[min(440px,100%)]
        flex-col 
        rounded 
        bg-primary-200 
        shadow-elevation-high
        [@media(max-width:440px)]:max-h-[100dvh]
        [@media(max-width:440px)]:rounded-none
        
    `,
    scrollable: 'flex flex-col justify-between',
});

export const BaseModalWrapper: FC = () => {
    return (
        <div className={cn(styles.inner, className)}>
        <Scrollable
            className={cn(styles.scrollable, scrollableClassName)}
            size='small'
            withoutGutter
        >
            {children}
        </Scrollable>
    </div>;
    )
};