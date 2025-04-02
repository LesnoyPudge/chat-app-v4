import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { useRefManager, withDisplayName } from '@lesnoypudge/utils-react';
import { cn, createStyles, getStatusLabel } from '@/utils';
import { MASK_ID } from '@/vars';
import { CSSProperties, FC, memo, useMemo } from 'react';
import { PresenceStatus, Overlay } from '@/components';
import { decorate } from '@lesnoypudge/macro';



const styles = createStyles({
    wrapper: 'relative shrink-0',
    inner: 'size-full',
    badge: `
        absolute
        bottom-0
        right-0
        size-[calc(10/32*100%)]
        rounded-full
    `,
});

export namespace WithStatusBadge {
    export type Props = (
        RT.PropsWithChildrenAndClassName
        & PresenceStatus.Statuses
        & {
            withTooltip?: boolean;
        }
    );
}

decorate(withDisplayName, 'WithStatusBadge', decorate.target);
decorate(memo, decorate.target);

export const WithStatusBadge: FC<WithStatusBadge.Props> = ({
    className = '',
    withTooltip = false,
    extraStatus,
    status,
    children,
}) => {
    const badgeRef = useRefManager<HTMLDivElement>(null);

    const showStatus = !!status && !!extraStatus;
    const showTooltip = showStatus && withTooltip;
    const statusTitle = (
        showTooltip
            ? getStatusLabel({ extraStatus, status })
            : null
    );

    const style = useMemo(() => ({
        maskImage: (
            showStatus
                ? `url(#${MASK_ID.STATUS_BADGE})`
                : undefined
        ),
    } as CSSProperties), [showStatus]);

    return (
        <div className={cn(styles.wrapper, className)}>
            <div
                className={styles.inner}
                style={style}
            >
                {children}
            </div>

            <If condition={showStatus}>
                <div
                    className={styles.badge}
                    ref={badgeRef}
                >
                    <PresenceStatus
                        extraStatus={extraStatus}
                        status={status}
                    />
                </div>
            </If>

            <If condition={showTooltip}>
                <Overlay.Tooltip
                    leaderElementRef={badgeRef}
                    preferredAlignment='top'
                >
                    {statusTitle}
                </Overlay.Tooltip>
            </If>
        </div>
    );
};