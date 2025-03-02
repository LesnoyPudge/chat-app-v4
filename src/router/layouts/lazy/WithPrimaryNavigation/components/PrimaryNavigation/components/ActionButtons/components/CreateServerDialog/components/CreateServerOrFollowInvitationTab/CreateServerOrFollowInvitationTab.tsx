import { FC } from 'react';
import { Button, DialogBlocks } from '@components';
import { ContextSelectable } from '@lesnoypudge/utils-react';
import { CreateServerTabContext } from '../../CreateServerDialog';
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
                    {t('CreateServerDialog.CreateServerOrFollowInvitationTab.title')}
                </DialogBlocks.Base.Title>

                <DialogBlocks.Base.Subtitle>
                    {t('CreateServerDialog.CreateServerOrFollowInvitationTab.subtitle')}
                </DialogBlocks.Base.Subtitle>
            </DialogBlocks.Base.Header>

            <DialogBlocks.Base.Content className={styles.content}>
                <Button
                    className={styles.button}
                    stylingPreset='brand'
                    size='medium'
                    onLeftClick={changeTab.createServer}
                >
                    {t('CreateServerDialog.CreateServerOrFollowInvitationTab.goToCreateServerButton.text')}
                </Button>

                <Button
                    className={styles.button}
                    stylingPreset='brand'
                    size='medium'
                    onLeftClick={changeTab.followInvitation}
                >
                    {t('CreateServerDialog.CreateServerOrFollowInvitationTab.goToFollowInvitationButton.text')}
                </Button>

                <Button
                    className={styles.button}
                    stylingPreset='lite'
                    size='medium'
                    onLeftClick={closeOverlay}
                >
                    {t('CreateServerDialog.CancelButton.text')}
                </Button>
            </DialogBlocks.Base.Content>
        </>
    );
};