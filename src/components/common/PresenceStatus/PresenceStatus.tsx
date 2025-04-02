import { FC, memo } from 'react';
import { Sprite } from '@/components';
import { ClientEntities, ExtendedRecord } from '@/types';
import { cn, createStyles, derivePresenceStatus } from '@/utils';
import { T } from '@lesnoypudge/types-utils-base/namespace';
import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { ASSETS } from '@/generated/ASSETS';
import { decorate } from '@lesnoypudge/macro';
import { withDisplayName } from '@lesnoypudge/utils-react';



type StatusNames = ClientEntities.User.VisibleStatus;

const statusNameToSprite = {
    afk: ASSETS.IMAGES.SPRITE.STATUS_AFK,
    dnd: ASSETS.IMAGES.SPRITE.STATUS_DND,
    offline: ASSETS.IMAGES.SPRITE.STATUS_OFFLINE,
    online: ASSETS.IMAGES.SPRITE.STATUS_ONLINE,
} satisfies Record<StatusNames, Sprite.Props['sprite']>;

const styles = createStyles({
    base: 'size-full',
    type: {
        online: 'fill-status-online',
        afk: 'fill-status-afk',
        dnd: 'fill-status-dnd',
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

decorate(withDisplayName, 'PresenceStatus', decorate.target);
decorate(memo, decorate.target);

export const PresenceStatus: FC<PresenceStatus.Props> = ({
    className = '',
    status,
    extraStatus,
    precalculatedStatus,
}) => {
    const statusToShow: StatusNames = (
        precalculatedStatus ?? (
            (status && extraStatus)
                ? derivePresenceStatus({ status, extraStatus })
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