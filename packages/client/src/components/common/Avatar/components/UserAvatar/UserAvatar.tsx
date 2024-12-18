import { FC, useMemo } from 'react';
import { cn, createStyles, getAssetUrl, getStatusLabel } from '@utils';
import { ClientEntities } from '@types';
import { getReadImagePath } from '../../utils';
import { useTrans } from '@i18n';
import { useBoolean, useRefManager } from '@lesnoypudge/utils-react';
import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { Image, Tooltip, UserStatus } from '@components';
import { sharedStyles } from '../../vars';
import { MASK_ID } from '@vars';



const styles = createStyles({
    wrapper: 'relative',
    status: 'absolute bottom-0 right-0 size-1/3',
});

export namespace UserAvatar {
    export type Props = (
        Partial<Pick<
            ClientEntities.User.Base,
            'avatar'
            | 'defaultAvatar'
            | 'status'
            | 'extraStatus'
        >>
        & RT.PropsWithClassName
        & {
            withStatus?: boolean;
            withStatusTooltip?: boolean;
        }
    );
}

export const UserAvatar: FC<UserAvatar.Props> = ({
    className = '',
    avatar,
    defaultAvatar,
    extraStatus,
    status,
    withStatus = false,
    withStatusTooltip = false,
}) => {
    const { t } = useTrans();
    const isLoadedState = useBoolean(false);
    const statusRefManager = useRefManager<HTMLDivElement>(null);

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

    const showImage = !!defaultAvatarSrc || !!avatarSrc;
    const showStatus = showImage && withStatus && !!status && !!extraStatus;
    const showTooltip = showStatus && withStatusTooltip;

    const statusTitle = (
        showStatus
            ? getStatusLabel({ extraStatus, status })
            : null
    );

    const style = useMemo(() => ({
        mask: (
            showStatus
                ? `url(#${MASK_ID.AVATAR_WITH_STATUS_MASK})`
                : undefined
        ),
    }), [showStatus]);

    return (
        <div className={cn(sharedStyles.wrapper, className)}>
            <If condition={showImage}>
                <Image
                    className={cn(
                        sharedStyles.image.base,
                        !isLoadedState.value && sharedStyles.image.notLoaded,
                    )}
                    style={style}
                    src={avatarSrc ?? defaultAvatarSrc}
                    alt={t('Avatar.alt')}
                    onLoad={isLoadedState.setTrue}
                    onError={isLoadedState.setFalse}
                />
            </If>

            <If condition={showStatus}>
                <div
                    className={styles.status}
                    role='img'
                    aria-label={statusTitle!}
                    ref={statusRefManager}
                >
                    <UserStatus
                        status={status!}
                        extraStatus={extraStatus!}
                    />
                </div>
            </If>

            <If condition={showTooltip}>
                <Tooltip
                    leaderElementRef={statusRefManager}
                    preferredAlignment='top'
                >
                    {statusTitle}
                </Tooltip>
            </If>
        </div>
    );
};