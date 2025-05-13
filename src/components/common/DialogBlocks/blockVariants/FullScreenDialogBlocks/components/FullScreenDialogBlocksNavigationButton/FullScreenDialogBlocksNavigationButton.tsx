import { cn, createStyles } from '@/utils';
import { FC } from 'react';
import { Button } from '@/components';



const styles = createStyles({
    item: `
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
        data-[active=true]:bg-primary-hover 
        data-[active=true]:fill-icon-100 
        data-[active=true]:text-color-primary 
        hover-focus-visible:bg-primary-hover 
        hover-focus-visible:fill-icon-100 
        hover-focus-visible:text-color-primary
    `,
});

export const FullScreenDialogBlocksNavigationButton: FC<Button.Props> = ({
    className = '',
    children,
    ...rest
}) => {
    return (
        <Button
            className={cn(styles.item, className)}
            {...rest}
        >
            {children}
        </Button>
    );
};