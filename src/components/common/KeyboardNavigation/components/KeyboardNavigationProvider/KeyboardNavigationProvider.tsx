import { FC } from 'react';
import { KeyboardNavigationContext } from '../../context';
import { Types } from '../../types';
import { useKeyboardNavigationControls } from '../../hooks';



export const KeyboardNavigationProvider: FC<Types.Provider.Props> = ({
    children,
    ...options
}) => {
    const value = useKeyboardNavigationControls(options);

    return (
        <KeyboardNavigationContext.Provider value={value}>
            {children}
        </KeyboardNavigationContext.Provider>
    );
};