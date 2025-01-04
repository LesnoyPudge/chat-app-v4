import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { useRefManager } from '@lesnoypudge/utils-react';
import { ClientEntities } from '@types';
import { cn, createStyles, getStatusLabel } from '@utils';
import { MASK_ID } from '@vars';
import { CSSProperties, FC, useMemo } from 'react';
import { Sprite, Tooltip } from '@components';
import { T } from '@lesnoypudge/types-utils-base/namespace';



type StatusNames = T.ValueOf<Pick<
    ClientEntities.User.Base,
    'status'
    | 'extraStatus'
>>;

const styles = createStyles({
    wrapper: 'relative',
    inner: 'size-full',
    badge: {
        base: `
            absolute
            bottom-0
            right-0
            size-[calc(10/32*100%)]
            rounded-full
        `,
        type: {
            online: 'fill-status-online',
            afk: 'fill-status-afk',
            default: 'fill-status-online',
            dnd: 'fill-status-dnd',
            invisible: 'fill-status-offline',
            offline: 'fill-status-offline',
        } satisfies Record<StatusNames, string>,
    },
});

const statusNameToSpriteName = {
    afk: 'STATUS_AFK',
    dnd: 'STATUS_DND',
    invisible: 'STATUS_OFFLINE',
    offline: 'STATUS_OFFLINE',
    online: 'STATUS_ONLINE',
    default: 'STATUS_ONLINE',
} satisfies Record<StatusNames, Sprite.Props['name']>;

export namespace WithStatusBadge {
    export type Props = (
        RT.PropsWithChildrenAndClassName
        & Partial<Pick<
            ClientEntities.User.Base,
            'status'
            | 'extraStatus'
        >>
        & {
            withTooltip?: boolean;
        }
    );
}

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

    const statusToShow = (
        status && extraStatus
            ? status === 'offline'
                ? status
                : extraStatus
            : 'offline'
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
                    className={cn(
                        styles.badge.base,
                        styles.badge.type[statusToShow],
                    )}
                    ref={badgeRef}
                >
                    <Sprite name={statusNameToSpriteName[statusToShow]}/>
                </div>
            </If>

            <If condition={showTooltip}>
                <Tooltip
                    leaderElementRef={badgeRef}
                    preferredAlignment='top'
                >
                    {statusTitle}
                </Tooltip>
            </If>
        </div>
    );
};