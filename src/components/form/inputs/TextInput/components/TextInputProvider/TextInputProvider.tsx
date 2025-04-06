import { FC } from 'react';
import { TextInputContext } from '../../context';
import { useTextInput, useTextInputDefaults } from '../../hooks';
import { Types } from '../../types';



export namespace TextInputProvider {
    export type Props = Types.ContextProviderProps;
}

export const TextInputProvider: FC<TextInputProvider.Props> = ({
    children,
    ...rest
}) => {
    const hook = useTextInput(rest);
    const propsWithDefaults = useTextInputDefaults(rest);

    const contextValue: Types.Context = {
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