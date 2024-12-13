import { FC } from 'react';
import { TextInputContext } from './context';
import { useTextInput, useTextInputDefaults } from './hooks';
import { TextInputTypes } from './textInputTypes';



export namespace TextInputProvider {
    export type Props = TextInputTypes.ContextProviderProps;
}

export const TextInputProvider: FC<TextInputProvider.Props> = ({
    children,
    ...rest
}) => {
    const hook = useTextInput(rest);
    const propsWithDefaults = useTextInputDefaults(rest);

    const contextValue: TextInputTypes.Context = {
        ...rest,
        ...propsWithDefaults,
        ...hook,
        initialType: rest.type,
    };

    return (
        <TextInputContext.Provider value={contextValue}>
            {children}
        </TextInputContext.Provider>
    );
};