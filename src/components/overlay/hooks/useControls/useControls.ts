import { useBoolean } from '@lesnoypudge/utils-react';



export namespace useControls {
    export type Return = {
        isOpen: boolean;
        toggle: VoidFunction;
        open: VoidFunction;
        close: VoidFunction;
        onChange: (value: boolean) => void;
    };
}

export const useControls = (
    initialState = false,
): useControls.Return => {
    const controls = useBoolean(initialState);

    return {
        isOpen: controls.value,
        close: controls.setFalse,
        open: controls.setTrue,
        toggle: controls.toggle,
        onChange: controls.setValue,
    };
};