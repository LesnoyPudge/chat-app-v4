import { cn, createStyles } from '@/utils';
import { CUSTOM_STYLES } from '@/vars';
import { FC, useId } from 'react';
import { useFileInputContext, useFileInputOnChange } from '../../hooks';
import { FileInputTypes } from '../../types';



const styles = createStyles({
    wrapper: 'relative block focus-within:outline-focus',
    input: `${CUSTOM_STYLES.SR_INPUT} outline-transparent`,
    error: 'sr-only',
});

export const FileInputNode: FC<FileInputTypes.Node.Props> = ({
    className = '',
    children,
}) => {
    const errorId = useId();
    const {
        accept,
        disabled,
        error,
        id,
        label,
        multiple,
        name,
        onBlur,
        readOnly,
        required,
        hidden,
        innerRef,
    } = useFileInputContext();

    const { onChange } = useFileInputOnChange();

    return (
        <div className={cn(styles.wrapper, className)}>
            <input
                className={styles.input}
                id={id}
                accept={accept}
                disabled={disabled}
                required={required}
                readOnly={readOnly}
                multiple={multiple}
                type='file'
                name={name}
                tabIndex={hidden ? -1 : 0}
                aria-hidden={hidden}
                aria-label={label}
                aria-invalid={!!error}
                aria-describedby={errorId}
                onChange={onChange}
                onBlur={onBlur}
                ref={innerRef}
            />

            {children}

            <span
                className={styles.error}
                id={errorId}
                aria-live='assertive'
            >
                {error}
            </span>
        </div>
    );
};