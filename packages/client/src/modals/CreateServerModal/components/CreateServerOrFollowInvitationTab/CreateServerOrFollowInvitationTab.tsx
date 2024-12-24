import { FC } from 'react';
import { Button } from '@components';
import { useContextProxy } from '@lesnoypudge/utils-react';
import { Modal } from '@entities';
import { CreateServerTabContext } from '../../CreateServerModal';
import { useTrans } from '@i18n';



export const CreateServerOrFollowInvitationTab: FC = () => {
    const { closeOverlay } = useContextProxy(Modal.Context);
    const { changeTab } = useContextProxy(CreateServerTabContext);
    const { t } = useTrans();

    return (
        <>
            <Modal.Base.Header>
                <Modal.Base.Title>
                    {t('CreateServerModal.CreateServerOrFollowInvitationTab.title')}
                    <>Добавьте канал</>
                </Modal.Base.Title>

                <Modal.Base.Subtitle>
                    {t('CreateServerModal.CreateServerOrFollowInvitationTab.subtitle')}
                </Modal.Base.Subtitle>
            </Modal.Base.Header>

            <Modal.Base.Content className='gap-2.5'>
                <Button
                    className='w-full'
                    stylingPreset='brand'
                    size='medium'
                    onLeftClick={changeTab.createServer}
                >
                    {t('CreateServerModal.CreateServerOrFollowInvitationTab.goToCreateServerButton.text')}
                </Button>

                <Button
                    className='w-full'
                    stylingPreset='brand'
                    size='medium'
                    onLeftClick={changeTab.followInvitation}
                >
                    {t('CreateServerModal.CreateServerOrFollowInvitationTab.goToFollowInvitationButton.text')}
                </Button>

                <Button
                    className='w-full'
                    stylingPreset='lite'
                    size='medium'
                    onLeftClick={closeOverlay}
                >
                    {t('CreateServerModal.CancelButton.text')}
                </Button>
            </Modal.Base.Content>
        </>
    );
};