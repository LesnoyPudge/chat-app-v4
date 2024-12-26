import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { cn, createStyles } from '@utils';
import { FC } from 'react';



const styles = createStyles({
    buttonWrapper: 'relative',
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
        focused: `
            peer-hover-focus-visible:h-5 
            peer-hover-focus-visible:opacity-100 
        `,
        active: 'h-10 opacity-100',
    },
    count: `
        absolute 
        bottom-0 
        h-4 
        min-w-4 
        rounded-full 
        bg-danger 
        text-xs 
        font-bold 
        text-white
    `,
});

export namespace WrapperWithBullet {
    export type Props = (
        RT.PropsWithChildrenAndClassName
        & {
            isActive: boolean;
            notificationsCount?: number;
        }
    );
}

export const WrapperWithBullet: FC<WrapperWithBullet.Props> = ({
    className = '',
    isActive = false,
    notificationsCount,
    children,
}) => {
    const showNotificationCount = (
        !!notificationsCount && notificationsCount > 0
    );

    const trimmedCount = (
        showNotificationCount
            ? notificationsCount >= 100 ? '99+' : notificationsCount
            : null
    );

    return (
        <div className={cn(styles.buttonWrapper, className)}>
            {children}

            <div
                className={cn(
                    styles.bullet.base,
                    {
                        [styles.bullet.focused]: !isActive,
                        [styles.bullet.active]: isActive,
                    },
                )}
            >
            </div>

            <If condition={showNotificationCount}>
                <span className={styles.count}>
                    {trimmedCount}
                </span>
            </If>
        </div>
    );
};