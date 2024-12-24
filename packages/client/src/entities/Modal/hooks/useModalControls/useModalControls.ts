import { useBoolean } from '@lesnoypudge/utils-react';



export namespace useModalControls {
    export type Return = {
        isOpen: boolean;
        toggle: VoidFunction;
        open: VoidFunction;
        close: VoidFunction;
        onChange: (value: boolean) => void;
    };
}

export const useModalControls = (
    initialState = false,
): useModalControls.Return => {
    const controls = useBoolean(initialState);

    return {
        isOpen: controls.value,
        close: controls.setFalse,
        open: controls.setTrue,
        toggle: controls.toggle,
        onChange: controls.setValue,
    };
};