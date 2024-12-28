import { createStyles } from '@utils';



const styles = createStyles({
    menuitem: `
        flex 
        w-full 
        items-center 
        justify-start 
        gap-3
    `,
});

export const menuItemStyles = styles.menuitem;

export const menuItemProps = {
    stylingPreset: 'invisibleBrand',
    size: 'small',
    role: 'menuitem',
} as const;