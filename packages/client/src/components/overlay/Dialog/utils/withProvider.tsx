import { createWithDecorator } from '@utils';
import { DialogProvider } from '../components';



export const { withDecorator: withProvider } = createWithDecorator<
    DialogProvider.Props
>(({ children, ...rest }) => {
    return (
        <DialogProvider {...rest}>
            {children}
        </DialogProvider>
    );
});