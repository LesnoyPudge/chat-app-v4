import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { cn, createStyles } from '@utils';
import { FC } from 'react';
import { Scrollable } from '@components';



const styles = createStyles({
    menu: `
        pointer-events-auto
        max-h-[90dvh] 
        min-w-[200px]
        rounded-sm 
        bg-primary-600 
        p-2.5 
        shadow-elevation-high
    `,
    scrollable: 'flex flex-col gap-1',
});

export namespace ContextMenuContainer {
    export type Props = (
        RT.PropsWithChildrenAndClassName
        & {
            label: string;
        }
    );
}

export const ContextMenuContainer: FC<ContextMenuContainer.Props> = ({
    className = '',
    label,
    children,
}) => {
    return (
        <div
            className={cn(styles.menu, className)}
            aria-label={label}
            role='menu'
            aria-orientation='horizontal'
        >
            <Scrollable
                className={styles.scrollable}
                size='small'
                withOppositeGutter
            >
                {children}
            </Scrollable>
        </div>
    );
};