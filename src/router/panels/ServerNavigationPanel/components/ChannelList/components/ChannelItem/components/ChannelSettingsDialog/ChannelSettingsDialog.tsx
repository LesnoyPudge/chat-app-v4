import { DialogBlocks } from '@/components';
import { useTrans } from '@/hooks';
import { createWithDecorator } from '@lesnoypudge/utils-react';



// export interface ChannelSettingsModalFormValues {
//     channelId: string;
//     channelName: string,
//     channelImage: EncodedFile[],
//     channelIsPrivate: boolean,
//     roleId: string,
//     roleName: string,
//     roleColorHEX: string,
//     roleImage: EncodedFile[],
//     roleChannelControl: boolean;
//     roleRoomControl: boolean;
//     roleCreateInvitation: boolean;
//     roleKickMember: boolean;
//     roleBanMember: boolean;
//     roleSendMessage: boolean;
//     roleIsAdministrator: boolean;
//     roleMembers: string[];
// }

// const transitionOptions = getTransitionOptions.fullScreenModal();

// const tabs = {
//     overviewTab: <OverviewTab/>,
//     rolesTab: <RolesTab/>,
//     membersTab: <MembersTab/>,
//     bannedTab: <BannedTab/>,
// };

const { withDecorator } = createWithDecorator<
    DialogBlocks.Types.PublicProps
>(({ children, controls }) => {
    const { t } = useTrans();

    return (
        <DialogBlocks.FullScreen.Provider
            label={t('ChannelSettingsDialog.label')}
            controls={controls}
        >
            <DialogBlocks.FullScreen.Wrapper>
                {children}
            </DialogBlocks.FullScreen.Wrapper>
        </DialogBlocks.FullScreen.Provider>
    );
});

type Props = {
    serverId: string;
    channelId: string;
};

export const ChannelSettingsDialog = withDecorator<Props>(() => {
    return <div>wow</div>;
    // const initialValues: ChannelSettingsModalFormValues = {
    //     channelId: 'someChannelID',
    //     channelName: 'coolChannel',
    //     channelImage: [],
    //     channelIsPrivate: false,
    //     roleId: 'id1',
    //     roleName: 'roleName',
    //     roleColorHEX: '#fff',
    //     roleImage: [],
    //     roleBanMember: true,
    //     roleChannelControl: true,
    //     roleCreateInvitation: false,
    //     roleIsAdministrator: false,
    //     roleKickMember: false,
    //     roleRoomControl: false,
    //     roleSendMessage: false,
    //     roleMembers: Array(29).fill('').map((_, index) => index.toString()),
    // };

    // const handleSubmit = (values: ChannelSettingsModalFormValues) => {
    //     console.log(values)
    // }

    // return (
    //     <ModalWindow
    //         label='Настройки канала'
    //         transitionOptions={transitionOptions}
    //     >
    //         <FullScreenModalContextProvider>
    //             <ContextConsumerProxy context={FullScreenModalContext}>
    //                 {({
    //                     resetShakeStacks, triggerScreenShake,
    //                     closeMobileMenu, withResetShakeStacks,
    //                     setIsDirty, isDirtyRef
    //                 }) => (
    //                     <Formik
    //                         initialValues={initialValues}
    //                         onSubmit={withResetShakeStacks(handleSubmit)}
    //                         onReset={resetShakeStacks}
    //                         enableReinitialize
    //                     >
    //                         {({ dirty }) => {
    //                             setIsDirty(dirty);

    //                             return (
    //                                 <TabContextProvider
    //                                     tabs={tabs}
    //                                     onTabChange={(prevent) => {
    //                                         if (!isDirtyRef.current) {
    //                                             closeMobileMenu()
    //                                             return;
    //                                         }
    //                                         prevent();
    //                                         triggerScreenShake();
    //                                     }}
    //                                 >
    //                                     {({ currentTab }) => (
    //                                         <Form>
    //                                             <FullScreenModalWrapper>
    //                                                 <FullScreenModalNavigationSide>
    //                                                     <Navigation/>
    //                                                 </FullScreenModalNavigationSide>

    //                                                 <FullScreenModalContentSide>
    //                                                     {currentTab.tab}
    //                                                 </FullScreenModalContentSide>
    //                                             </FullScreenModalWrapper>
    //                                         </Form>
    //                                     )}
    //                                 </TabContextProvider>
    //                             )
    //                         }}
    //                     </Formik>
    //                 )}
    //             </ContextConsumerProxy>
    //         </FullScreenModalContextProvider>
    //     </ModalWindow>
    // );
});