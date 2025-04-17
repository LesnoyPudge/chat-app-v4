import { FC, memo } from 'react';
import { cn, getReadFilePath, getAssetUrl } from '@/utils';
import { ClientEntities, ExtendedRecord } from '@/types';
import { useTrans } from '@/hooks';
import { useBoolean, withDisplayName } from '@lesnoypudge/utils-react';
import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { Image } from '@/components';
import { sharedStyles } from '../../vars';
import { ASSETS } from '@/generated/ASSETS';
import { T } from '@lesnoypudge/types-utils-base/namespace';
import { decorate } from '@lesnoypudge/macro';



const avatarIndexToAsset = {
    '1': ASSETS.IMAGES.COMMON.DEFAULT_AVATAR_1,
    '2': ASSETS.IMAGES.COMMON.DEFAULT_AVATAR_2,
    '3': ASSETS.IMAGES.COMMON.DEFAULT_AVATAR_3,
    '4': ASSETS.IMAGES.COMMON.DEFAULT_AVATAR_4,
} satisfies Record<
    ClientEntities.User.Base['defaultAvatar'],
    T.ValueOf<ASSETS['IMAGES']['COMMON']>
>;

export namespace UserAvatar {
    export type Props = (
        ExtendedRecord<Pick<
            ClientEntities.User.Base,
            'avatar' | 'defaultAvatar'
        >, undefined>
        & RT.PropsWithClassName
    );
}

decorate(withDisplayName, 'UserAvatar', decorate.target);
decorate(memo, decorate.target);

export const UserAvatar: FC<UserAvatar.Props> = ({
    className = '',
    avatar,
    defaultAvatar,
}) => {
    const { t } = useTrans();
    const isLoadedState = useBoolean(false);

    const defaultAvatarSrc = (
        (!avatar && defaultAvatar)
            ? getAssetUrl(avatarIndexToAsset[defaultAvatar])
            : null
    );

    const avatarSrc = (
        (avatar && !defaultAvatar)
            ? getReadFilePath(avatar)
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