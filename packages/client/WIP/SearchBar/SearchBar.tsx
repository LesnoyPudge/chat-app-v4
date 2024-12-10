import { Button, Form } from '@components';
import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { cn, createStyles } from '@utils';
import { FC, useRef } from 'react';



export namespace SearchBar {
    export type Props = (
        RT.PropsWithClassName
        & {
            placeholder?: string;
            label: string;
            value: string;
            setValue: (value: string) => void;
            // onBlur?: Form.Inputs.TextInput.NodePure.Props['onBlur'];
        }
    );
}

const styles = createStyles({
    wrapper: 'flex h-10',
    input: 'h-full',
    button: `
        flex 
        aspect-square 
        h-full 
        shrink-0 
        rounded 
        fill-icon-300 
        hover-focus-visible:fill-icon-200
    `,
    icon: 'm-auto aspect-square h-2/3 shrink-0',
});

export const SearchBar: FC<SearchBar.Props> = ({
    className = '',
    placeholder = 'Поиск',
    label,
    value,
    setValue,
}) => {
    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleClick = () => {
        if (value) return onReset();
        inputRef.current && inputRef.current.focus();
    };

    const iconId = value ? IMAGES.SPRITE.CROSS_ICON.NAME : IMAGES.SPRITE.SEARCH_ICON.NAME;
    const buttonLabel = conditional('Очистить поиск', 'Перейти к поиску', !!value);

    return (
        <TextInputWrapper className={cn(styles.wrapper, className)}>
            <TextInput
                className={styles.input}
                name='search'
                placeholder={placeholder}
                value={value}
                label={label}
                inputRef={inputRef}
                onChange={onChange}
            />

            <Button
                className={styles.button}
                label={buttonLabel}
                onLeftClick={handleClick}
            >
                <SpriteImage
                    className={styles.icon}
                    name={iconId}
                />
            </Button>
        </TextInputWrapper>
    );
};