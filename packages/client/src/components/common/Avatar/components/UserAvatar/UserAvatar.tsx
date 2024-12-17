import { FC } from 'react';
import { BaseAvatar } from '../BaseAvatar';
import { getAssetUrl } from '@utils';
import { T } from '@lesnoypudge/types-utils-base/namespace';
import { ClientEntities } from '@types';
import { getReadImagePath } from '../../utils';
import { never } from '@lesnoypudge/utils';



export namespace UserAvatar {
    type ConditionalProps = Pick<
        ClientEntities.User.Base,
        'avatar' | 'defaultAvatar'
    >;

    export type Props = (
        ConditionalProps
        & T.Except<BaseAvatar.Props, 'id' | 'src'>
        & {
            withStatus?: boolean;
        }
    );
}

export const UserAvatar: FC<UserAvatar.Props> = ({
    avatar,
    defaultAvatar,
    avatarClassName,
    placeholderClassName,
    withStatus = false,
}) => {
    const src = (
        getReadImagePath(avatar)
        ?? getAssetUrl(`DEFAULT_AVATAR_${defaultAvatar}.png`)
    );
    never('status');
    return (
        <BaseAvatar
            src={src}
            avatarClassName={avatarClassName}
            placeholderClassName={placeholderClassName}
        />
    );
};