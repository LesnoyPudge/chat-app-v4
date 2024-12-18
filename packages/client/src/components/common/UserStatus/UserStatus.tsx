import { FC } from 'react';
import { Sprite } from '@components';
import { cn, createStyles } from '@utils';
import { ClientEntities } from '@types';
import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { STATUS_LABEL } from '@vars';



type StatusNames = keyof typeof STATUS_LABEL;

const statusNameToSpriteName = {
    afk: 'STATUS_AFK',
    dnd: 'STATUS_DND',
    invisible: 'STATUS_OFFLINE',
    offline: 'STATUS_OFFLINE',
    online: 'STATUS_ONLINE',
    default: 'STATUS_ONLINE',
} satisfies Record<StatusNames, Sprite.Props['name']>;

const styles = createStyles({
    online: 'fill-status-online',
    afk: 'fill-status-afk',
    default: 'fill-status-online',
    dnd: 'fill-status-dnd',
    invisible: 'fill-status-offline',
    offline: 'fill-status-offline',
}) satisfies Record<StatusNames, string>;

export namespace UserStatus {
    export type Props = (
        RT.PropsWithClassName
        & Pick<
            ClientEntities.User.Base,
            'status' | 'extraStatus'
        >
    );
}

export const UserStatus: FC<UserStatus.Props> = ({
    className = '',
    status,
    extraStatus,
}) => {
    const statusToShow = (
        status === 'offline'
            ? status
            : extraStatus
    );

    return (
        <Sprite
            className={cn(styles[statusToShow], className)}
            name={statusNameToSpriteName[statusToShow]}
        />
    );
};