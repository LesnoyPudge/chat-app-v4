import { createWithDecorator } from '@utils';
import { DialogProvider, DialogWrapper } from '../components';



export const createDecorator = (props: DialogProvider.Props) => {
    return createWithDecorator(({ children }) => {
        return (
            <DialogProvider {...props}>
                <DialogWrapper>
                    {children}
                </DialogWrapper>
            </DialogProvider>
        );
    });
};