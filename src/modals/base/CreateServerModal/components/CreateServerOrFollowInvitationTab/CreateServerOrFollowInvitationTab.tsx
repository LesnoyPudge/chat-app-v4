import { FC } from 'react';
import { Button, DialogBlocks } from '@components';
import { ContextSelectable } from '@lesnoypudge/utils-react';
import { CreateServerTabContext } from '../../CreateServerModal';
import { useTrans } from '@hooks';
import { createStyles } from '@utils';



const styles = createStyles({
    content: 'gap-2.5',
    button: 'w-full',
});

export const CreateServerOrFollowInvitationTab: FC = () => {
    const { closeOverlay } = ContextSelectable.useProxy(DialogBlocks.Context);
    const { changeTab } = ContextSelectable.useProxy(CreateServerTabContext);
    const { t } = useTrans();

    return (
        <>
            <DialogBlocks.Base.Header>
                <DialogBlocks.Base.Title>
                    {t('CreateServerModal.CreateServerOrFollowInvitationTab.title')}
                </DialogBlocks.Base.Title>

                <DialogBlocks.Base.Subtitle>
                    {t('CreateServerModal.CreateServerOrFollowInvitationTab.subtitle')}
                </DialogBlocks.Base.Subtitle>
            </DialogBlocks.Base.Header>

            <DialogBlocks.Base.Content className={styles.content}>
                <Button
                    className={styles.button}
                    stylingPreset='brand'
                    size='medium'
                    onLeftClick={changeTab.createServer}
                >
                    {t('CreateServerModal.CreateServerOrFollowInvitationTab.goToCreateServerButton.text')}
                </Button>

                <Button
                    className={styles.button}
                    stylingPreset='brand'
                    size='medium'
                    onLeftClick={changeTab.followInvitation}
                >
                    {t('CreateServerModal.CreateServerOrFollowInvitationTab.goToFollowInvitationButton.text')}
                </Button>

                <Button
                    className={styles.button}
                    stylingPreset='lite'
                    size='medium'
                    onLeftClick={closeOverlay}
                >
                    {t('CreateServerModal.CancelButton.text')}
                </Button>
            </DialogBlocks.Base.Content>
        </>
    );
};