import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { cn, createStyles } from '@utils';
import { FC } from 'react';



const styles = createStyles({
    menu: `
        pointer-events-auto 
        flex 
        min-w-[200px] 
        flex-col 
        gap-1 
        rounded-sm 
        bg-primary-600 
        p-2.5 
        shadow-elevation-high
    `,
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
            {children}
        </div>
    );
};