import { Tab, DialogBlocks } from '@/components';
import {
    CreateServerOrFollowInvitationTab,
    FollowInvitationTab,
    CreateServerTab,
} from './components';
import { withDisplayNameAndDecorator } from '@/utils';
import { useTrans } from '@/hooks';



const tabs = Tab.createTabs({
    createServerOrFollowInvitation: <CreateServerOrFollowInvitationTab/>,
    followInvitation: <FollowInvitationTab/>,
    createServer: <CreateServerTab/>,
});

export const CreateServerTabContext = Tab.createTabContext<typeof tabs>();

const { withDecorator } = withDisplayNameAndDecorator<
    DialogBlocks.Types.PublicProps
>('CreateServerDialog', ({ children, controls }) => {
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

export const CreateServerDialog = withDecorator(() => {
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