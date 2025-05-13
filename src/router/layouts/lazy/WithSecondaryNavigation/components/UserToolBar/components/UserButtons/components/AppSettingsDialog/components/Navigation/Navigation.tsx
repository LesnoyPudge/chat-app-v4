import { DialogBlocks, ExternalLink, Separator, Sprite } from '@/components';
import { createStyles, localStorageApi } from '@/utils';
import { FC } from 'react';
import { AppSettingsDialogTabs } from '../../AppSettingsDialog';
import { useTrans } from '@/hooks';
import { ASSETS } from '@/generated/ASSETS';
import { useFunction } from '@lesnoypudge/utils-react';
import { Store } from '@/features';
import { SOCIAL_LINKS } from '@/vars';



const styles = createStyles({
    button: 'group w-full',
    logoutIcon: 'size-4',
    socialWrapper: 'mt-2 flex gap-1.5 px-2.5',
    socialLink: 'fill-icon-200 p-1 hover-focus-visible:fill-icon-100',
    socialIcon: 'size-5',
});

export const Navigation: FC = () => {
    const { t } = useTrans();

    const [
        logoutTrigger,
        logoutHelpers,
    ] = Store.Users.Api.useUserLogoutMutation();

    const handleLogout = useFunction(() => {
        void logoutTrigger({
            refreshToken: localStorageApi.get('refreshToken'),
        });
    });

    return (
        <>
            <AppSettingsDialogTabs.List>
                <DialogBlocks.FullScreen.NavigationHeading>
                    {t('AppSettingsDialog.Navigation.profileTabLabel')}
                </DialogBlocks.FullScreen.NavigationHeading>

                <AppSettingsDialogTabs.Item.ProfileTab>
                    {(tabProps) => (
                        <DialogBlocks.FullScreen.NavigationButton
                            {...tabProps}
                            label={t('AppSettingsDialog.Navigation.profileTabButton.label')}
                        >
                            {t('AppSettingsDialog.Navigation.profileTabButton.label')}
                        </DialogBlocks.FullScreen.NavigationButton>
                    )}
                </AppSettingsDialogTabs.Item.ProfileTab>

                <Separator spacing={16} thickness={2} length='100%'/>

                <DialogBlocks.FullScreen.NavigationHeading>
                    {t('AppSettingsDialog.Navigation.appearanceTabLabel')}
                </DialogBlocks.FullScreen.NavigationHeading>

                <AppSettingsDialogTabs.Item.AppearanceTab>
                    {(tabProps) => (
                        <DialogBlocks.FullScreen.NavigationButton
                            {...tabProps}
                            label={t('AppSettingsDialog.Navigation.appearanceTabButton.label')}
                        >
                            {t('AppSettingsDialog.Navigation.appearanceTabButton.label')}
                        </DialogBlocks.FullScreen.NavigationButton>
                    )}
                </AppSettingsDialogTabs.Item.AppearanceTab>
            </AppSettingsDialogTabs.List>

            <Separator spacing={16} thickness={2} length='100%'/>

            <DialogBlocks.FullScreen.NavigationButton
                label={t('AppSettingsDialog.Navigation.logoutButton.label')}
                isLoading={logoutHelpers.isLoading}
                onLeftClick={handleLogout}
            >
                <span>
                    {t('AppSettingsDialog.Navigation.logoutButton.text')}
                </span>

                <Sprite
                    className={styles.logoutIcon}
                    sprite={ASSETS.IMAGES.SPRITE.DOORWAY_ICON}
                />
            </DialogBlocks.FullScreen.NavigationButton>

            <Separator spacing={16} thickness={2} length='100%'/>

            <div className={styles.socialWrapper}>
                <ExternalLink
                    className={styles.socialLink}
                    href={SOCIAL_LINKS.TWITTER}
                    label='Twitter'
                >
                    <Sprite
                        className={styles.socialIcon}
                        sprite={ASSETS.IMAGES.SPRITE.TWITTER_ICON}
                    />
                </ExternalLink>

                <ExternalLink
                    className={styles.socialLink}
                    href={SOCIAL_LINKS.FACEBOOK}
                    label='Facebook'
                >
                    <Sprite
                        className={styles.socialIcon}
                        sprite={ASSETS.IMAGES.SPRITE.FACEBOOK_ICON}
                    />
                </ExternalLink>

                <ExternalLink
                    className={styles.socialLink}
                    href={SOCIAL_LINKS.INSTAGRAM}
                    label='Instagram'
                >
                    <Sprite
                        className={styles.socialIcon}
                        sprite={ASSETS.IMAGES.SPRITE.INSTAGRAM_ICON}
                    />
                </ExternalLink>
            </div>
        </>
    );
};