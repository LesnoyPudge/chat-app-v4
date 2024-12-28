import { createWithDecorator } from '@utils';
import { OverlayProvider } from '../components';



export const withProvider = createWithDecorator(({ children }) => {
    return (
        <OverlayProvider>
            {children}
        </OverlayProvider>
    );
});