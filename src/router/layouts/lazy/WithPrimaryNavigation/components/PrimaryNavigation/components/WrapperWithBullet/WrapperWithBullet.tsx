import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { cn, createStyles } from '@utils';
import { FC } from 'react';



const styles = createStyles({
    buttonWrapper: 'relative mr-auto pl-3',
    bullet: {
        base: `
            absolute 
            left-0 
            top-1/2 
            h-0 
            w-2 
            -translate-x-1/2 
            -translate-y-1/2 
            rounded-r-[4px]
            bg-white-black 
            opacity-0 
            transition-all 
            duration-300
        `,
        singleState: {
            base: `
                peer-hover-focus-visible:h-5 
                peer-hover-focus-visible:opacity-100 
            `,
            notifications: 'h-2 opacity-100',
            active: 'h-10 opacity-100',
        },
    },
});

export namespace WrapperWithBullet {
    export type Props = (
        RT.PropsWithChildrenAndClassName
        & {
            isActive: boolean;
            withNotifications?: boolean;
        }
    );
}

export const WrapperWithBullet: FC<WrapperWithBullet.Props> = ({
    className = '',
    isActive = false,
    withNotifications = false,
    children,
}) => {
    const showBaseStyle = !isActive;
    const showNotificationStyle = !isActive && withNotifications;
    const showActiveStyle = isActive;

    return (
        <div className={cn(styles.buttonWrapper, className)}>
            {children}

            <div
                className={cn(
                    styles.bullet.base,
                    showBaseStyle && styles.bullet.singleState.base,
                    showNotificationStyle && styles.bullet.singleState.notifications,
                    showActiveStyle && styles.bullet.singleState.active,
                )}
            >
            </div>
        </div>
    );
};