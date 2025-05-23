import { FC, useMemo, useEffect, useRef } from 'react';
import { Slate } from 'slate-react';
import { RTETypes } from '../../types';
import { RTEModules } from '../../RTEModules';
import { RTEContext } from '../../context';
import { noop, shallowEqual } from '@lesnoypudge/utils';
import { useFunction } from '@lesnoypudge/utils-react';



export const RTEContextProvider: FC<RTETypes.Provider.Props> = ({
    name,
    value = RTEModules.Utils.createInitialValue(),
    label,
    placeholder,
    maxLength = 2_000,
    disabled = false,
    onChange,
    onSubmit = noop,
    onSelectionChange = noop,
    onBlur = noop,
    onKeyDown = () => false,
    children,
}) => {
    const lastValueRef = useRef(value);
    const editor = useMemo(() => RTEModules.Utils.createEditorWithPlugins({
        characterLimit: {
            maxLength,
        },
    }), [maxLength]);

    const handleChange: NonNullable<
        typeof onChange
    > = useFunction((newValue) => {
        if (!onChange) return;
        if (newValue === lastValueRef.current) return;

        lastValueRef.current = newValue;
        onChange(newValue);
    });

    useEffect(() => {
        if (shallowEqual(editor.children, value)) return;

        editor.delete({
            at: {
                anchor: editor.start([]),
                focus: editor.end([]),
            },
        });
        editor.children = value;
        editor.normalize({ force: true });
        editor.onChange();
    }, [value, editor]);

    useEffect(() => {
        editor.normalize({ force: true });
        editor.onChange();
    }, [editor]);

    const contextValues: RTETypes.Context = {
        maxLength,
        label,
        placeholder,
        name,
        disabled,
        onSubmit,
        onBlur,
        onKeyDown,
    };

    return (
        <Slate
            editor={editor}
            initialValue={value}
            onChange={handleChange}
            onSelectionChange={onSelectionChange}
        >
            <RTEContext.Provider value={contextValues}>
                {children}
            </RTEContext.Provider>
        </Slate>
    );
};