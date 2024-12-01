import { Button, Image, Scrollable } from '@components';
import { FC } from 'react';
import { useInvitationScreen } from './useInvitationScreen';
import { createStyles, getAssetUrl } from '@utils';
import { CUSTOM_STYLES } from '@vars';
import { Heading } from '@lesnoypudge/utils-react';
import { useTrans } from '@i18n';



export namespace InvitationScreenPure {
    export type Props = ReturnType<typeof useInvitationScreen>;
}

const styles = createStyles({
    screen: CUSTOM_STYLES.SCREEN,
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
    avatar: 'size-20 rounded-full',
    heading: 'mt-4 text-2xl font-semibold text-color-primary',
    statsWrapper: `
        mt-2 
        flex 
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
    channel,
}) => {
    const { t } = useTrans();

    return (
        <div className={styles.screen}>
            <Image
                className={styles.bg}
                src={getAssetUrl('FANCY_BG.jpg')}
            />

            <Scrollable
                className={styles.scrollable}
                withOppositeGutter
                label='Invitation page'
            >
                <div className={styles.inner}>
                    <div className={styles.contentWrapper}>
                        <Image
                            className={styles.avatar}
                            src={channel.avatarId}
                        />

                        <Heading.Node className={styles.heading}>
                            {channel.name}
                        </Heading.Node>

                        <div className={styles.statsWrapper}>
                            <div className={styles.stat}>
                                <div className={styles.statOnline}></div>

                                <span>
                                    {t(
                                        'InvitationScreen.onlineCount',
                                        { count: channel.onlineCount },
                                    )}
                                </span>
                            </div>

                            <div className={styles.stat}>
                                <div className={styles.statOffline}></div>

                                <span>
                                    <>{t(
                                        'InvitationScreen.totalCount',
                                        { count: channel.membersCount },
                                    )}
                                    </>
                                </span>
                            </div>
                        </div>

                        <Button
                            className={styles.button}
                            size='big'
                            stylingPreset='brand'
                            onLeftClick={acceptInvitation}
                        >
                            {t('InvitationScreen.button')}
                        </Button>
                    </div>
                </div>
            </Scrollable>
        </div>
    );
};

export const InvitationScreen: FC = () => {
    return (
        <InvitationScreenPure {...useInvitationScreen()}/>
    );
};