import { FC } from 'react';
// import { AppearanceTab, Navigation, ProfileTab } from './components';
import { Overlay } from '@/components';



// export type AppSettingsFullScreenDialogTabs = typeof tabs;

// const transitionOptions = getTransitionOptions.fullScreenDialog();

// const tabs = {
//     profileTab: <ProfileTab/>,
//     appearanceTab: <AppearanceTab/>,
// };

export namespace AppSettingsDialog {
    export type Props = Overlay.Types.WithControls;
}

export const AppSettingsDialog: FC<AppSettingsDialog.Props> = ({
    controls,
}) => {
    return null;
    // const initialValues = {
    //     avatar: '',
    //     theme: 'dark',
    //     messageDisplayMode: 'cozy',
    // };

    // const handleSubmit = (values: any) => {
    //     console.log(values);
    // };

    // return (
    //     <DialogWindow
    //         label='Настройки приложения'
    //         transitionOptions={transitionOptions}
    //     >
    //         <FullScreenDialogContextProvider>
    //             <ContextConsumerProxy context={FullScreenDialogContext}>
    //                 {({
    //                     resetShakeStacks, triggerScreenShake,
    //                     closeMobileMenu, withResetShakeStacks,
    //                     setIsDirty, isDirtyRef,
    //                 }) => (
    //                     <Formik
    //                         initialValues={initialValues}
    //                         onSubmit={withResetShakeStacks(handleSubmit)}
    //                         onReset={resetShakeStacks}
    //                     >
    //                         {({ dirty }) => {
    //                             setIsDirty(dirty);

    //                             return (
    //                                 <TabContextProvider
    //                                     tabs={tabs}
    //                                     onTabChange={(prevent) => {
    //                                         if (!isDirtyRef.current) {
    //                                             return closeMobileMenu();
    //                                         }
    //                                         prevent();
    //                                         triggerScreenShake();
    //                                     }}
    //                                 >
    //                                     {({ currentTab }) => (
    //                                         <Form>
    //                                             <FullScreenDialogWrapper>
    //                                                 <FullScreenDialogNavigationSide>
    //                                                     <Navigation/>
    //                                                 </FullScreenDialogNavigationSide>

    //                                                 <FullScreenDialogContentSide>
    //                                                     {currentTab.tab}
    //                                                 </FullScreenDialogContentSide>
    //                                             </FullScreenDialogWrapper>
    //                                         </Form>
    //                                     )}
    //                                 </TabContextProvider>
    //                             );
    //                         }}
    //                     </Formik>
    //                 )}
    //             </ContextConsumerProxy>
    //         </FullScreenDialogContextProvider>
    //     </DialogWindow>
    // );
};