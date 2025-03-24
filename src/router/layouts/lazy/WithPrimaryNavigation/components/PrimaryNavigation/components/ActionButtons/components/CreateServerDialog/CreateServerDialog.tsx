import { Tab, DialogBlocks } from '@/components';
import {
    CreateServerOrFollowInvitationTab,
    FollowInvitationTab,
    CreateServerTab,
} from './components';
import { useTrans } from '@/hooks';
import { createWithDecorator, withDisplayName } from '@lesnoypudge/utils-react';
import { decorate } from '@lesnoypudge/macro';
import { FC } from 'react';



const tabs = Tab.createTabs({
    createServerOrFollowInvitation: <CreateServerOrFollowInvitationTab/>,
    followInvitation: <FollowInvitationTab/>,
    createServer: <CreateServerTab/>,
});

const { tabName } = Tab.createProps(tabs);

export const CreateServerTabContext = Tab.createTabContext<typeof tabs>();

const { withDecorator } = createWithDecorator<
    DialogBlocks.Types.PublicProps
>(({ children, controls }) => {
    const { t } = useTrans();

    return (
        <DialogBlocks.Base.Provider
            label={t('CreateServerDialog.label')}
            controls={controls}
        >
            <DialogBlocks.Base.Wrapper>
                {children}
            </DialogBlocks.Base.Wrapper>
        </DialogBlocks.Base.Provider>
    );
});

decorate(withDisplayName, 'CreateServerDialog', decorate.target);

export const CreateServerDialog = withDecorator(() => {
    return (
        <Tab.Provider
            context={CreateServerTabContext}
            tabs={tabs}
            initialTab={tabName.createServerOrFollowInvitation}
        >
            <Tab.Current context={CreateServerTabContext}/>
        </Tab.Provider>
    );
});