import { createWithDecorator } from '@utils';
import { OverlayProvider } from '../components';



export const { withDecorator: withProvider } = createWithDecorator<
    OverlayProvider.Props
>(({ children, ...rest }) => {
    return (
        <OverlayProvider {...rest}>
            {children}
        </OverlayProvider>
    );
});