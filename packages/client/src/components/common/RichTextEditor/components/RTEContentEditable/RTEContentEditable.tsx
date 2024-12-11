import { CSSProperties, FC } from 'react';
import { Editable, useSlate } from 'slate-react';
import { cn, createStyles } from '@utils';
import { PropsWithClassName } from '@lesnoypudge/types-utils-react';
import { RTEContext } from '../../context';
import { RTEModules } from '../../RTEModules';
import { useContextProxy } from '@lesnoypudge/utils-react';



const styles = createStyles({
    editor: 'w-full outline-transparent',
});

const style = {
    fontSize: 'var(--message-font-size)',
    lineHeight: 'var(--message-line-height)',
} satisfies CSSProperties;

export namespace RTEContentEditable {
    export type Props = PropsWithClassName;
}

export const RTEContentEditable: FC<RTEContentEditable.Props> = ({
    className = '',
}) => {
    const editor = useSlate();
    const {
        onSubmit,
        label,
        placeholder,
        maxLength,
        name,
        disabled,
    } = useContextProxy(RTEContext);

    return (
        <Editable
            className={cn(styles.editor, className)}
            style={style}
            renderElement={RTEModules.Render.renderElement}
            renderLeaf={RTEModules.Render.renderLeaf}
            renderPlaceholder={RTEModules.Render.renderPlaceholder}
            onKeyDown={RTEModules.Events.KeyDown(editor, onSubmit)}
            onFocus={RTEModules.Events.Focus(editor)}
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