import { Avatar, Inputs } from '@/components';
import { Store } from '@/features';
import { createStyles, MBToBytes } from '@/utils';
import { ACCEPTED_FILE_TYPE } from '@/vars';
import { FC } from 'react';
import { AppSettingsDialogForm } from '../../../../../../AppSettingsDialog';
import { useTrans } from '@/hooks';



const styles = createStyles({
    header: 'flex h-14',
    avatarWrapper: 'relative w-[94px]',
    avatarInner: `
        absolute 
        bottom-0 
        aspect-square 
        w-full 
        rounded-full 
        bg-primary-500 
        p-[7px]
    `,
    avatarButton: 'group relative h-full w-full rounded-full',
    avatarOverlay: `
        pointer-events-none 
        absolute 
        inset-0 
        grid 
        place-items-center 
        rounded-full 
        bg-black/80 
        opacity-0 
        transition-all  
        group-hover-focus-within:opacity-100
    `,
    avatarOverlayText: `
        text-center 
        text-10-12 
        font-bold 
        uppercase 
        text-white
    `,
    avatar: 'size-full rounded-full',
    username: 'ml-4 text-xl font-medium text-color-primary',
});

export const Header: FC = () => {
    const { t } = useTrans();
    const avatar = Store.useSelector(
        Store.Users.Selectors.selectCurrentUserAvatar,
    );

    const defaultAvatar = Store.useSelector(
        Store.Users.Selectors.selectCurrentUserDefaultAvatar,
    );

    const username = Store.useSelector(
        Store.Users.Selectors.selectCurrentUserName,
    );

    return (
        <div className={styles.header}>
            <div className={styles.avatarWrapper}>
                <div className={styles.avatarInner}>
                    <Inputs.FileInput.Provider
                        accept={ACCEPTED_FILE_TYPE.IMAGES}
                        amountLimit={1}
                        label={t('AppSettingsDialog.ProfileTab.Header.avatar.label')}
                        sizeLimit={MBToBytes(5)}
                        name={AppSettingsDialogForm.names.avatar}
                    >
                        {({ value }) => (
                            <Inputs.FileInput.Node
                                className={styles.avatarButton}
                            >
                                <Avatar.User
                                    className={styles.avatar}
                                    avatar={value ?? avatar}
                                    defaultAvatar={defaultAvatar}
                                />

                                <div className={styles.avatarOverlay}>
                                    <div className={styles.avatarOverlayText}>
                                        {t('AppSettingsDialog.ProfileTab.Header.avatar.text')}
                                    </div>
                                </div>
                            </Inputs.FileInput.Node>
                        )}
                    </Inputs.FileInput.Provider>
                </div>
            </div>

            <span className={styles.username}>
                {username}
            </span>
        </div>
    );
};