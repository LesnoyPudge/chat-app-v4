import { Button, Overlay } from '@/components';
import { Store } from '@/features';
import { useTrans } from '@/hooks';
import { createStyles } from '@/utils';
import { Heading } from '@lesnoypudge/utils-react';
import { FC } from 'react';
import { ChangePasswordDialog, ChangeUsernameDialog } from './components';



const styles = createStyles({
    list: 'flex flex-col gap-6 rounded-lg bg-primary-300 p-4',
    row: 'flex w-full items-center gap-4',
    infoWrapper: 'mr-auto flex min-w-0 flex-col',
    infoTitle: `
        mb-1    
        truncate 
        text-xs 
        font-bold 
        uppercase 
        text-color-secondary
    `,
    infoValueWrapper: 'flex gap-2',
    infoValue: 'truncate text-color-primary',
    revealInfoValueButton: 'h-auto min-h-0 p-0 text-color-link',
});

export const Content: FC = () => {
    const { t } = useTrans();
    const usernameControls = Overlay.useControls();
    const passwordControls = Overlay.useControls();

    const username = Store.useSelector(
        Store.Users.Selectors.selectCurrentUserName,
    );

    return (
        <ul className={styles.list}>
            <li className={styles.row}>
                <div className={styles.infoWrapper}>
                    <Heading.Node className={styles.infoTitle}>
                        {t('AppSettingsDialog.ProfileTab.ProfileManager.username.title')}
                    </Heading.Node>

                    <div className={styles.infoValueWrapper}>
                        <span className={styles.infoValue}>
                            {username}
                        </span>
                    </div>
                </div>

                <Button
                    stylingPreset='brandNeutral'
                    label={t('AppSettingsDialog.ProfileTab.ProfileManager.username.changeButton.label')}
                    hasPopup='dialog'
                    isActive={usernameControls.isOpen}
                    onLeftClick={usernameControls.open}
                >
                    {t('COMMON.Change')}
                </Button>

                <ChangeUsernameDialog controls={usernameControls}/>
            </li>

            <li className={styles.row}>
                <div className={styles.infoWrapper}>
                    <Heading.Node className={styles.infoTitle}>
                        {t('AppSettingsDialog.ProfileTab.ProfileManager.password.title')}
                    </Heading.Node>

                    <div className={styles.infoValueWrapper}>
                        <span className={styles.infoValue}>
                            <>********</>
                        </span>
                    </div>
                </div>

                <Button
                    stylingPreset='brandNeutral'
                    label={t('AppSettingsDialog.ProfileTab.ProfileManager.password.changeButton.label')}
                    hasPopup='dialog'
                    isActive={passwordControls.isOpen}
                    onLeftClick={passwordControls.open}
                >
                    {t('COMMON.Change')}
                </Button>

                <ChangePasswordDialog controls={passwordControls}/>
            </li>
        </ul>
    );
};