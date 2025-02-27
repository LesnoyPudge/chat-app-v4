import { Tab, DialogBlocks } from '@components';
import { t } from '@features';
import {
    CreateServerOrFollowInvitationTab,
    FollowInvitationTab,
    CreateServerTab,
} from './components';
import { createWithDecorator, withDisplayName } from '@lesnoypudge/utils-react';



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

export const CreateServerModal = withDisplayName(
    'CreateServerModal',
    withDecorator(() => {
        return (
            <Tab.Provider
                context={CreateServerTabContext}
                tabs={tabs}
                initialTab='createServerOrFollowInvitation'
            >
                <Tab.Current context={CreateServerTabContext}/>
            </Tab.Provider>
        );
    }),
);