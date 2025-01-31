import { FC } from 'react';
// import { AppearanceTab, Navigation, ProfileTab } from './components';
import { Overlay } from '@components';



// export type AppSettingsFullScreenModalTabs = typeof tabs;

// const transitionOptions = getTransitionOptions.fullScreenModal();

// const tabs = {
//     profileTab: <ProfileTab/>,
//     appearanceTab: <AppearanceTab/>,
// };

export namespace AppSettingsModal {
    export type Props = Overlay.Types.WithControls;
}

export const AppSettingsModal: FC<AppSettingsModal.Props> = ({
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
    //     <ModalWindow
    //         label='Настройки приложения'
    //         transitionOptions={transitionOptions}
    //     >
    //         <FullScreenModalContextProvider>
    //             <ContextConsumerProxy context={FullScreenModalContext}>
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
    //                             );
    //                         }}
    //                     </Formik>
    //                 )}
    //             </ContextConsumerProxy>
    //         </FullScreenModalContextProvider>
    //     </ModalWindow>
    // );
};