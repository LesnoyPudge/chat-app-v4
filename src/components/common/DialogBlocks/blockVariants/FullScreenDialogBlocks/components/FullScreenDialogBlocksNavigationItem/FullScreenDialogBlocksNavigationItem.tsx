import { cn, createStyles } from '@/utils';
import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { FC } from 'react';



const styles = createStyles({
    item: {
        base: `
            flex 
            w-full 
            items-center 
            justify-between 
            rounded-md 
            fill-icon-200 
            px-2.5 
            py-1.5 
            text-start 
            font-medium
            text-color-secondary 
            hover-focus-within:bg-primary-hover 
            hover-focus-within:fill-icon-100 
            hover-focus-within:text-color-primary
        `,
        active: 'bg-primary-hover fill-icon-100 text-color-primary',
    },
});

type Props = (
    RT.PropsWithChildrenAndClassName
    & {
        isActive?: boolean;
    }
);

export const FullScreenDialogBlocksNavigationItem: FC<Props> = ({
    className = '',
    isActive = false,
    children,
}) => {
    return (
        <div className={cn(
            styles.item.base,
            isActive && styles.item.active,
            className,
        )}>
            {children}
        </div>
    );
};