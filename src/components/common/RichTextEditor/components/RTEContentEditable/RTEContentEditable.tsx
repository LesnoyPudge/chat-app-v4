import { CSSProperties, FC, useEffect } from 'react';
import { Editable, ReactEditor, useSlate } from 'slate-react';
import { cn, createStyles } from '@/utils';
import { RTEContext } from '../../context';
import { RTEModules } from '../../RTEModules';
import { ContextSelectable, useFunction } from '@lesnoypudge/utils-react';
import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { addEventListener } from '@lesnoypudge/utils-web';



const styles = createStyles({
    editor: 'w-full outline-transparent',
});

const style = {
    fontSize: 'var(--message-editor-font-size)',
    lineHeight: 'var(--message-editor-line-height)',
    paddingBlock: 'var(--message-editor-y-padding)',
} satisfies CSSProperties;

export const RTEContentEditable: FC<RT.PropsWithClassName> = ({
    className = '',
}) => {
    const editor = useSlate();

    const {
        onSubmit,
        onBlur,
        onKeyDown,
        label,
        placeholder,
        maxLength,
        name,
        disabled,
    } = ContextSelectable.useProxy(RTEContext);

    const handleKeyDown = useFunction(RTEModules.Events.KeyDown(
        editor,
        onSubmit,
        [onKeyDown],
    ));

    useEffect(() => {
        const editorNode = ReactEditor.toDOMNode(editor, editor);

        return addEventListener(editorNode, 'keydown', handleKeyDown);
    }, [editor, handleKeyDown]);

    const handleFocus = useFunction(RTEModules.Events.Focus(editor));

    return (
        <Editable
            className={cn(styles.editor, className)}
            style={style}
            renderElement={RTEModules.Render.renderElement}
            renderLeaf={RTEModules.Render.renderLeaf}
            renderPlaceholder={RTEModules.Render.renderPlaceholder}
            onFocus={handleFocus}
            onBlur={onBlur}
            aria-label={label}
            placeholder={placeholder}
            maxLength={maxLength}
            name={name}
            readOnly={disabled}
            suppressContentEditableWarning
            spellCheck
        />
    );
};