// @ts-nocheck
import {
    useFunction,
    useIsomorphicLayoutEffect,
} from '@lesnoypudge/utils-react';
import * as React from 'react';
import {
    unstable_NormalPriority as NormalPriority,
    unstable_runWithPriority as runWithPriority,
    unstable_ImmediatePriority as ImmediatePriority,
} from 'scheduler';



export const useContextSelector = (context, selector) => {
    const contextValue = React.useContext(context);
    const {
        value: { current: value },
        version: { current: version },
        listeners,
    } = contextValue;
    const selected = selector(value);
    const [state, setState] = React.useState([
        value,
        selected,
    ]);
    const dispatch = (payload) => {
        console.log('dispatch', payload);
        // debugger;
        setState((prevState) => {
            if (!payload) {
                // early bail out when is dispatched during render
                return [
                    value,
                    selected,
                ];
            }
            if (payload[0] <= version) {
                if (Object.is(prevState[1], selected)) {
                    return prevState; // bail out
                }
                return [
                    value,
                    selected,
                ];
            }
            try {
                if (Object.is(prevState[0], payload[1])) {
                    return prevState; // do not update
                }
                const nextSelected = selector(payload[1]);
                if (Object.is(prevState[1], nextSelected)) {
                    return prevState; // do not update
                }
                return [
                    payload[1],
                    nextSelected,
                ];
            } catch {
            // ignored (stale props or some other reason)
            }
            // explicitly spread to enforce typing
            return [
                prevState[0],
                prevState[1],
            ]; // schedule update
        });
    };
    if (!Object.is(state[1], selected)) {
        // schedule re-render
        // this is safe because it's self contained
        dispatch(undefined);
    }
    const stableDispatch = useFunction(dispatch);
    useIsomorphicLayoutEffect(() => {
        listeners.push(stableDispatch);
        return () => {
            const index = listeners.indexOf(stableDispatch);
            listeners.splice(index, 1);
        };
    }, [
        stableDispatch,
        listeners,
    ]);
    return state[1];
};

const createProvider = (Original) => {
    const Provider = (props) => {
        // Holds an actual "props.value"
        const valueRef = React.useRef(props.value);
        // Used to sync context updates and avoid stale values, can be considered as render/effect counter of Provider.
        const versionRef = React.useRef(0);
        // A stable object, is used to avoid context updates via mutation of its values.
        const contextValue = React.useRef();
        if (!contextValue.current) {
            contextValue.current = {
                value: valueRef,
                version: versionRef,
                listeners: [],
            };
        }

        // if (!Object.is(valueRef.current, props.value)) {
        //     valueRef.current = props.value;
        //     versionRef.current += 1;
        //     runWithPriority(NormalPriority, () => {
        //         contextValue.current.listeners.forEach((listener) => {
        //             listener([
        //                 versionRef.current,
        //                 props.value,
        //             ]);
        //         });
        //     });
        // }

        useIsomorphicLayoutEffect(() => {
            valueRef.current = props.value;
            versionRef.current += 1;
            // runWithPriority(NormalPriority, () => {
            contextValue.current.listeners.forEach((listener) => {
                listener([
                    versionRef.current,
                    props.value,
                ]);
            });
            // });
        }, [
            props.value,
        ]);
        return React.createElement(Original, {
            value: contextValue.current,
        }, props.children);
    };
    /* istanbul ignore else */ if (process.env.NODE_ENV !== 'production') {
        Provider.displayName = 'ContextSelector.Provider';
    }
    return Provider;
};

export const createContext = (defaultValue) => {
    // eslint-disable-next-line @fluentui/no-context-default-value
    const context = React.createContext({
        value: {
            current: defaultValue,
        },
        version: {
            current: -1,
        },
        listeners: [],
    });
    context.Provider = createProvider(context.Provider);
    // We don't support Consumer API
    delete context.Consumer;
    return context;
};