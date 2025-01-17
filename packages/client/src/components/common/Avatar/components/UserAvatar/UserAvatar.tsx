import { FC } from 'react';
import { cn, createStyles, getAssetUrl } from '@utils';
import { ClientEntities, ExtendedRecord } from '@types';
import { getReadImagePath } from '../../utils';
import { useTrans } from '@i18n';
import { useBoolean } from '@lesnoypudge/utils-react';
import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { Image } from '@components';
import { sharedStyles } from '../../vars';



export namespace UserAvatar {
    export type Props = (
        ExtendedRecord<Pick<
            ClientEntities.User.Base,
            'avatar' | 'defaultAvatar'
        >, undefined>
        & RT.PropsWithClassName
    );
}

export const UserAvatar: FC<UserAvatar.Props> = ({
    className = '',
    avatar,
    defaultAvatar,
}) => {
    const { t } = useTrans();
    const isLoadedState = useBoolean(false);

    const defaultAvatarSrc = (
        (!avatar && defaultAvatar)
            ? getAssetUrl(`DEFAULT_AVATAR_${defaultAvatar}.png`)
            : null
    );

    const avatarSrc = (
        (avatar && !defaultAvatar)
            ? getReadImagePath(avatar)
            : null
    );

    return (
        <div className={cn(
            sharedStyles.wrapper.base,
            !isLoadedState.value && sharedStyles.wrapper.notLoaded,
            className,
        )}>
            <Image
                className={cn(
                    sharedStyles.image.base,
                    !isLoadedState.value && sharedStyles.image.notLoaded,
                )}
                src={avatarSrc ?? defaultAvatarSrc}
                alt={t('Avatar.alt')}
                onLoad={isLoadedState.setTrue}
                onError={isLoadedState.setFalse}
            />
        </div>
    );
};