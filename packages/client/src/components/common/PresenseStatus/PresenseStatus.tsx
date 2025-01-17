import { FC } from 'react';
import { Sprite } from '@components';
import { ClientEntities, ExtendedRecord } from '@types';
import { cn, createStyles } from '@utils';
import { T } from '@lesnoypudge/types-utils-base/namespace';
import { RT } from '@lesnoypudge/types-utils-react/namespace';



type StatusNames = T.ValueOf<Pick<
    ClientEntities.User.Base,
    'status'
    | 'extraStatus'
>>;

const statusNameToSpriteName = {
    afk: 'STATUS_AFK',
    dnd: 'STATUS_DND',
    invisible: 'STATUS_OFFLINE',
    offline: 'STATUS_OFFLINE',
    online: 'STATUS_ONLINE',
    default: 'STATUS_ONLINE',
} satisfies Record<StatusNames, Sprite.Props['name']>;

const styles = createStyles({
    base: 'size-full',
    type: {
        online: 'fill-status-online',
        afk: 'fill-status-afk',
        default: 'fill-status-online',
        dnd: 'fill-status-dnd',
        invisible: 'fill-status-offline',
        offline: 'fill-status-offline',
    } satisfies Record<StatusNames, string>,
});

export namespace PresenceStatus {
    export type Statuses = ExtendedRecord<Pick<
        ClientEntities.User.Base,
        'status'
        | 'extraStatus'
    >, undefined>;

    type Conditional = T.Simplify<(
        (
            { precalculatedStatus: StatusNames }
            & Partial<T.Override<Statuses, keyof Statuses, never>>
        )
        | (
            { precalculatedStatus?: never }
            & Statuses
        )
    )>;

    export type Props = (
        Conditional
        & RT.PropsWithClassName
    );
}

export const PresenceStatus: FC<PresenceStatus.Props> = ({
    className = '',
    status,
    extraStatus,
    precalculatedStatus,
}) => {
    const statusToShow = (
        precalculatedStatus ?? (
            (status && extraStatus)
                ? status === 'offline'
                    ? status
                    : extraStatus
                : 'offline'
        )
    );

    return (
        <Sprite
            className={cn(
                styles.base,
                styles.type[statusToShow],
                className,
            )}
            name={statusNameToSpriteName[statusToShow]}
        />
    );
};