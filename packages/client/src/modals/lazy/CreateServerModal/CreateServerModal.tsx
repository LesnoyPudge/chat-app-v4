import { Tab } from '@components';
import { Modal } from '@entities';
import { useTrans } from '@i18n';
import { FC } from 'react';
import {
    CreateServerOrFollowInvitationTab,
    FollowInvitationTab,
    CreateServerTab,
} from './components';



const tabs = Tab.createTabs({
    createServerOrFollowInvitation: <CreateServerOrFollowInvitationTab/>,
    followInvitation: <FollowInvitationTab/>,
    createServer: <CreateServerTab/>,
});

export const CreateServerTabContext = Tab.createTabContext<typeof tabs>();

export namespace CreateServerModal {
    export type Props = Modal.Types.WithControls;
}

export const CreateServerModal: FC<CreateServerModal.Props> = ({
    controls,
}) => {
    const { t } = useTrans();

    return (
        <Modal.Base.Provider
            label={t('CreateServerModal.label')}
            controls={controls}
        >
            <Modal.Base.Wrapper>
                <Tab.Provider
                    context={CreateServerTabContext}
                    tabs={tabs}
                    initialTab='createServerOrFollowInvitation'
                >
                    <Tab.Current context={CreateServerTabContext}/>
                </Tab.Provider>
            </Modal.Base.Wrapper>
        </Modal.Base.Provider>
    );
};