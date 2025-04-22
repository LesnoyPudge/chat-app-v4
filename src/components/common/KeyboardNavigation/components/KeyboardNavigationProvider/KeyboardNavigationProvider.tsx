import { FC } from 'react';
import { KeyboardNavigationContext } from '../../context';
import { Types } from '../../types';
import { useKeyboardNavigationInstance } from '../../hooks';



export const KeyboardNavigationProvider: FC<Types.Provider.Props> = ({
    children,
    ...options
}) => {
    const value = useKeyboardNavigationInstance(options);

    return (
        <KeyboardNavigationContext.Provider value={value}>
            {children}
        </KeyboardNavigationContext.Provider>
    );
};