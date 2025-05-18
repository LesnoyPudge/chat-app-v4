import { FC } from 'react';
import {
    ServerSettingsForm,
    useServerSettingsDialogContextProxy,
} from '../../../../ServerSettingsDialog';
import { createStyles, MBToBytes } from '@/utils';
import { Avatar, Button, Inputs } from '@/components';
import { ACCEPTED_FILE_TYPE } from '@/vars';
import { useTrans } from '@/hooks';
import { Store } from '@/features';



const styles = createStyles({
    wrapper: 'flex items-center gap-4 mobile:flex-col',
    avatar: 'mx-6 size-[100px] rounded-full',
    button: 'w-full',
    descriptionSideWrapper: 'flex w-full flex-col gap-2',
    buttonsWrapper: 'grid grid-cols-2 gap-2 mobile:grid-cols-1',
});

export const AvatarUploader: FC = () => {
    const { t } = useTrans();
    const { serverId } = useServerSettingsDialogContextProxy();

    const avatar = Store.useSelector(
        Store.Servers.Selectors.selectAvatarById(serverId),
    );

    const name = Store.useSelector(
        Store.Servers.Selectors.selectNameById(serverId),
    );

    return (
        <Inputs.FileInput.Provider
            accept={ACCEPTED_FILE_TYPE.IMAGES}
            amountLimit={1}
            label={t('ServerSettingsDialog.AvatarUploader.label')}
            sizeLimit={MBToBytes(5)}
            name={ServerSettingsForm.names.avatar}
        >
            {({ value, setValue }) => (
                <div className={styles.wrapper}>
                    <Avatar.Server
                        className={styles.avatar}
                        avatar={value ?? avatar}
                        name={name}
                    />

                    <div className='flex flex-col gap-2'>
                        <p>
                            {t('ServerSettingsDialog.AvatarUploader.description')}
                        </p>

                        <div className={styles.buttonsWrapper}>
                            <Inputs.FileInput.Node>
                                <Button
                                    className={styles.button}
                                    stylingPreset='brand'
                                    size='medium'
                                    hidden
                                >
                                    {t('ServerSettingsDialog.AvatarUploader.uploadButton.text')}
                                </Button>
                            </Inputs.FileInput.Node>

                            <Button
                                className={styles.button}
                                stylingPreset='brandNeutral'
                                size='medium'
                                isDisabled={!value}
                                onLeftClick={() => setValue(null)}
                            >
                                {t('ServerSettingsDialog.AvatarUploader.removeButton.text')}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </Inputs.FileInput.Provider>
    );
};