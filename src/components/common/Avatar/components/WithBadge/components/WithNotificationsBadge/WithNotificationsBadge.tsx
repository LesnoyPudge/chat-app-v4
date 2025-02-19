import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { cn, createStyles, formatNotificationCount } from '@utils';
import { MASK_ID } from '@vars';
import { CSSProperties, FC, useMemo } from 'react';



const styles = createStyles({
    wrapper: 'relative size-full shrink-0 @container',
    inner: 'size-full',
    badge: {
        base: `
            pointer-events-none
            absolute
            bottom-0
            right-0
            flex
            h-1/3
            items-center
            justify-center
            rounded-[25cqi]
            bg-danger
            font-[sans-serif]
            text-[25cqi]
            font-bold
            leading-none
            text-white
        `,
        size: {
            big: 'w-[62.5%]',
            medium: 'w-[calc(22/48*100%)]',
            small: 'w-1/3',
        },
    },
});

const sizeToMaskId = {
    small: MASK_ID.NOTIFICATION_BADGE_SMALL,
    medium: MASK_ID.NOTIFICATION_BADGE_MEDIUM,
    big: MASK_ID.NOTIFICATION_BADGE_BIG,
};

type Sizes = keyof typeof sizeToMaskId;

export namespace WithNotificationsBadge {
    export type Props = (
        RT.PropsWithChildrenAndClassName
        & {
            count: number;
        }
    );
}

export const WithNotificationsBadge: FC<WithNotificationsBadge.Props> = ({
    className = '',
    count,
    children,
}) => {
    const formattedCount = formatNotificationCount(count);
    const showBadge = count > 0;
    const countAsString = String(count);
    const badgeSize: Sizes = (
        countAsString.length <= 1
            ? 'small'
            : countAsString.length === 2
                ? 'medium'
                : 'big'
    );
    const maskId = sizeToMaskId[badgeSize];

    const style = useMemo(() => ({
        maskImage: showBadge ? `url(#${maskId})` : undefined,
    } as CSSProperties), [maskId, showBadge]);

    return (
        <div className={cn(styles.wrapper, className)}>
            <div
                className={styles.inner}
                style={style}
            >
                {children}
            </div>

            <If condition={showBadge}>
                <div className={cn(
                    styles.badge.base,
                    styles.badge.size[badgeSize],
                )}>
                    {formattedCount}
                </div>
            </If>
        </div>
    );
};