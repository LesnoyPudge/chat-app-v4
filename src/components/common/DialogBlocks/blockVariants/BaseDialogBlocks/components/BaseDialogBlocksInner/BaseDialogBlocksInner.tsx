import { cn, createStyles } from '@/utils';
import { FC } from 'react';
import { Scrollable } from '@/components';
import { RT } from '@lesnoypudge/types-utils-react/namespace';



const styles = createStyles({
    inner: `
        pointer-events-auto
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
    content: 'flex flex-col justify-between',
});

export const BaseDialogBlocksInner: FC<
    RT.PropsWithChildrenAndClassName
> = ({
    className = '',
    children,
}) => {
    return (
        <div className={cn(styles.inner, className)}>
            <Scrollable
                size='small'
                withoutGutter
            >
                <div className={styles.content}>
                    {children}
                </div>
            </Scrollable>
        </div>
    );
};