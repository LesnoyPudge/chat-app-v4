import { Tab, Modal } from '@components';
import { t } from '@i18n';
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

const {
    withDecorator,
} = Modal.Base.createDecorator('CreateServerModal', {
    label: t('CreateServerModal.label'),
});

export const CreateServerModal = withDecorator(() => {
    return (
        <Tab.Provider
            context={CreateServerTabContext}
            tabs={tabs}
            initialTab='createServerOrFollowInvitation'
        >
            <Tab.Current context={CreateServerTabContext}/>
        </Tab.Provider>
    );
});