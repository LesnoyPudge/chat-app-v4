import { createStyles } from '@utils';
import type { Button } from '@components';



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
} satisfies Pick<
    Button.Props,
    'stylingPreset'
    | 'size'
    | 'role'
>;