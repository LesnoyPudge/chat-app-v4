import { ClientEntities } from '@types';
import { FC } from 'react';
import { BaseAvatar } from '../BaseAvatar';
import { T } from '@lesnoypudge/types-utils-base/namespace';
import { getReadImagePath } from '../../utils';



export namespace ServerAvatar {
    type ConditionalProps = Partial<Pick<
        ClientEntities.Server.Base,
        'avatar' | 'name'
    >>;

    export type Props = (
        ConditionalProps
        & T.Except<BaseAvatar.Props, 'id' | 'src'>
    );
}

export const ServerAvatar: FC<ServerAvatar.Props> = ({
    avatarClassName = '',
    placeholderClassName = '',
    avatar,
    name,
}) => {
    const src = getReadImagePath(avatar);

    return (
        <>
        </>
    );
};