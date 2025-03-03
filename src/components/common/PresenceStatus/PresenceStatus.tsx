import { FC } from 'react';
import { Sprite } from '@/components';
import { ClientEntities, ExtendedRecord } from '@/types';
import { cn, createStyles } from '@/utils';
import { T } from '@lesnoypudge/types-utils-base/namespace';
import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { ASSETS } from '@/generated/ASSETS';



type StatusNames = T.ValueOf<Pick<
    ClientEntities.User.Base,
    'status'
    | 'extraStatus'
>>;

const statusNameToSprite = {
    afk: ASSETS.IMAGES.SPRITE.STATUS_AFK,
    dnd: ASSETS.IMAGES.SPRITE.STATUS_DND,
    invisible: ASSETS.IMAGES.SPRITE.STATUS_OFFLINE,
    offline: ASSETS.IMAGES.SPRITE.STATUS_OFFLINE,
    online: ASSETS.IMAGES.SPRITE.STATUS_ONLINE,
    default: ASSETS.IMAGES.SPRITE.STATUS_ONLINE,
} satisfies Record<StatusNames, Sprite.Props['sprite']>;

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
            sprite={statusNameToSprite[statusToShow]}
        />
    );
};