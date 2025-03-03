import { Avatar, Button, Image, Placeholder, Scrollable } from '@/components';
import { FC } from 'react';
import { useInvitationScreen } from './useInvitationScreen';
import { createStyles, getAssetUrl } from '@/utils';
import { CUSTOM_STYLES } from '@/vars';
import { Heading } from '@lesnoypudge/utils-react';
import { useTrans } from '@/hooks';
import { Screen } from '@/router/layouts/bundled';
import { ASSETS } from '@/generated/ASSETS';



export namespace InvitationScreenPure {
    export type Props = ReturnType<typeof useInvitationScreen>;
}

const styles = createStyles({
    scrollable: 'h-full',
    inner: `flex min-h-full content-center py-5`,
    bg: CUSTOM_STYLES.IMAGE_BG_FULLSCREEN,
    contentWrapper: `
        m-auto 
        flex 
        w-[min(100%,480px)]
        flex-col 
        items-center 
        rounded 
        bg-primary-200 
        p-8 
        text-center 
        shadow-elevation-high 
        [@media(max-width:480px)]:px-4
    `,
    avatar: 'size-20',
    heading: `
        mt-4
        w-full
        text-center 
        text-2xl 
        font-semibold 
        text-color-primary
    `,
    statsWrapper: `
        mt-2
        flex 
        w-full 
        flex-wrap 
        justify-center 
        gap-3 
        text-color-muted
    `,
    stat: 'flex items-center gap-1',
    statOnline: 'size-2.5 rounded-full bg-positive',
    statOffline: 'size-2.5 rounded-full bg-icon-200',
    button: 'mt-8 w-full',
});

export const InvitationScreenPure: FC<InvitationScreenPure.Props> = ({
    acceptInvitation,
    server,
}) => {
    const { t } = useTrans();

    return (
        <Screen>
            <Image
                className={styles.bg}
                src={getAssetUrl(ASSETS.IMAGES.COMMON.FANCY_BG)}
            />

            <Scrollable
                className={styles.scrollable}
                withOppositeGutter
                label='Invitation page'
            >
                <div className={styles.inner}>
                    <div className={styles.contentWrapper}>
                        <Avatar.Server
                            className={styles.avatar}
                            avatar={server?.avatar}
                            name={server?.name}
                        />

                        <Heading.Node className={styles.heading}>
                            <Placeholder.With reveal={!!server}>
                                {server?.name}
                            </Placeholder.With>
                        </Heading.Node>

                        <div className={styles.statsWrapper}>
                            <Placeholder.With reveal={!!server}>
                                <div className={styles.stat}>
                                    <div className={styles.statOnline}></div>

                                    <span>
                                        {t(
                                            'InvitationScreen.onlineCount',
                                            { count: server?.onlineMemberCount },
                                        )}
                                    </span>
                                </div>

                                <div className={styles.stat}>
                                    <div className={styles.statOffline}></div>

                                    <span>
                                        {t(
                                            'InvitationScreen.totalCount',
                                            { count: server?.members.length },
                                        )}
                                    </span>
                                </div>
                            </Placeholder.With>
                        </div>

                        <Button
                            className={styles.button}
                            size='big'
                            stylingPreset='brand'
                            isDisabled={!server}
                            onLeftClick={acceptInvitation}
                        >
                            {t('InvitationScreen.button')}
                        </Button>
                    </div>
                </div>
            </Scrollable>
        </Screen>
    );
};

export const InvitationScreen: FC = () => {
    return (
        <InvitationScreenPure {...useInvitationScreen()}/>
    );
};