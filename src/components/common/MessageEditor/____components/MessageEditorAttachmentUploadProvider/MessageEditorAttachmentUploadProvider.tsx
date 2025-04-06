import { OverlayContextProvider } from '@components';
import { FormikFileInput } from '@libs';
import { MBToBytes } from '@shared';
import { FC, PropsWithChildren } from 'react';
import { AlertOverlays, FileDropModal } from './components';



export const MessageEditorAttachmentUploadProvider: FC<PropsWithChildren> = ({
    children,
}) => {
    return (
        <AlertOverlays>
            {({ overflowModalHelpers, sizeModalHelpers }) => (
                <FormikFileInput
                    name='attachments'
                    label='Добавить вложение'
                    options={{
                        accept: '*',
                        amountLimit: 9,
                        sizeLimit: MBToBytes(8),
                    }}
                    multiple
                    onAmountLimit={overflowModalHelpers.openOverlay}
                    onSizeLimit={sizeModalHelpers.openOverlay}
                >
                    {(props) => (
                        <AttachmentUploadContext.Provider value={props}>
                            {children}

                            <OverlayContextProvider>
                                <FileDropModal/>
                            </OverlayContextProvider>
                        </AttachmentUploadContext.Provider>
                    )}
                </FormikFileInput>
            )}
        </AlertOverlays>
    );
};