import { Tab, DialogBlocks } from '@/components';
import {
    CreateServerOrFollowInvitationTab,
    FollowInvitationTab,
    CreateServerTab,
} from './components';
import { useTrans } from '@/hooks';
import { createWithDecorator, withDisplayName } from '@lesnoypudge/utils-react';
import { decorate } from '@lesnoypudge/macro';



export const { CreateServerTabs } = Tab.createTypedTabs({
    name: 'CreateServer',
    tabs: {
        CreateServerOrFollowInvitation: <CreateServerOrFollowInvitationTab/>,
        FollowInvitation: <FollowInvitationTab/>,
        CreateServer: <CreateServerTab/>,
    },
});

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
    const { label } = DialogBlocks.useContextProxy();

    return (
        <CreateServerTabs.Provider
            label={label}
            initialTab={CreateServerTabs.tabNameTable.CreateServerOrFollowInvitation}
        >
            <CreateServerTabs.Current/>
        </CreateServerTabs.Provider>
    );
});