import { useFunction, useTimeout } from '@lesnoypudge/utils-react';
import { createContext, FC, useContext, useMemo, useState } from 'react';
import * as Fluent from '@fluentui/react-context-selector';
import * as Selector from 'use-context-selector';

const useValue = () => {
    const [
        unstableValue,
        setValue,
    ] = useState(0);

    const stableFn = useFunction(() => {
        setValue((prev) => prev + 1);
    });

    return useMemo(() => ({
        unstableValue,
        stableFn,
    }), [stableFn, unstableValue]);
};

type Values = ReturnType<typeof useValue>;

type WithValues = { value: Values };

const logValues = ({
    name,
    context,
    value,
}: { name: string; context: Values; value: Values }) => {
    console.log(name.toUpperCase(), JSON.stringify({
        props: value.unstableValue,
        context: context.unstableValue,
    }, null, 4));
};

const BaseContext = createContext<Values>();

const FluentContext = Fluent.createContext<Values>(undefined as any);

const SelectorContext = Selector.createContext<Values>(undefined as any);

const BaseLayer2: FC<WithValues> = ({ value }) => {
    // @ts-expect-error
    const context = useContext(BaseContext, 0);

    logValues({
        name: 'base',
        // @ts-expect-error
        context,
        value,
    });

    return null;
};

const BaseLayer1: FC<WithValues> = ({ value }) => {
    return (
        <BaseContext.Provider value={value}>
            <BaseLayer2 value={value}/>
        </BaseContext.Provider>
    );
};

// const FluentLayer2: FC<WithValues> = ({ value }) => {
//     const context = Fluent.useContextSelector(
//         FluentContext,
//         (v) => v,
//     );

//     logValues({
//         name: 'Fluent',
//         context,
//         value,
//     });

//     return null;
// };

// const FluentLayer1: FC<WithValues> = ({ value }) => {
//     return (
//         <FluentContext.Provider value={value}>
//             <FluentLayer2 value={value}/>
//         </FluentContext.Provider>
//     );
// };

// const SelectorLayer2: FC<WithValues> = ({ value }) => {
//     const context = Selector.useContextSelector(
//         SelectorContext,
//         (v) => v,
//     );

//     logValues({
//         name: 'Selector',
//         context,
//         value,
//     });

//     return null;
// };

// const SelectorLayer1: FC<WithValues> = ({ value }) => {
//     return (
//         <SelectorContext.Provider value={value}>
//             <SelectorLayer2 value={value}/>
//         </SelectorContext.Provider>
//     );
// };


import * as Custom from './custom';
import * as WithExternal from './withExternal';


// const CustomContext = Custom.createContext();

// const CustomLayer2: FC<WithValues> = ({ value }) => {
//     const context = Custom.useContextSelector(
//         CustomContext,
//         // @ts-expect-error
//         (v) => v,
//     );

//     logValues({
//         name: 'custom',
//         context,
//         value,
//     });

//     return null;
// };

// const CustomLayer1: FC<WithValues> = ({ value }) => {
//     return (
//         // @ts-expect-error
//         <CustomContext.Provider value={value}>
//             <CustomLayer2 value={value}/>
//         </CustomContext.Provider>
//     );
// };

// const WithExternalContext = WithExternal.createContext();

// const WithExternalLayer2: FC<WithValues> = ({ value }) => {
//     const context = WithExternal.useContextSelector(
//         WithExternalContext,
//         // @ts-expect-error
//         (v) => v,
//     );

//     logValues({
//         name: 'WithExternal',
//         context,
//         value,
//     });

//     return null;
// };

// const WithExternalLayer1: FC<WithValues> = ({ value }) => {
//     return (
//         <WithExternalContext.Provider value={value}>
//             <WithExternalLayer2 value={value}/>
//         </WithExternalContext.Provider>
//     );
// };

export const ContextSelectorTest: FC = () => {
    const value = useValue();

    useTimeout(() => {
        value.stableFn();
    }, 500);

    return (
        <>
            <BaseLayer1 value={value}/>

            <BaseLayer1 value={value}/>

            {/* <WithExternalLayer1 value={value}/> */}

            {/* <CustomLayer1 value={value}/> */}

            {/* <FluentLayer1 value={value}/> */}

            {/* <SelectorLayer1 value={value}/> */}
        </>
    );
};