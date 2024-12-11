import { FC } from 'react';
import { TextInputContext } from './context';
import { useTextInput } from './hooks';
import { TextInputTypes } from './textInputTypes';



export namespace TextInputProvider {
    export type Props = TextInputTypes.ContextProviderProps;
}

export const TextInputProvider: FC<TextInputProvider.Props> = ({
    children,
    ...rest
}) => {
    const hook = useTextInput(rest);

    const contextValue: TextInputTypes.Context = {
        ...rest,
        ...hook,
        initialType: rest.type,
    };

    return (
        <TextInputContext.Provider value={contextValue}>
            {children}
        </TextInputContext.Provider>
    );
};