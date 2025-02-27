import { Button, Form, Sprite } from '@components';
import { ASSETS } from '@generated/ASSETS';
import { useTrans } from '@hooks';
import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { noop } from '@lesnoypudge/utils';
import { useFunction } from '@lesnoypudge/utils-react';
import { cn, createStyles } from '@utils';
import { ChangeEventHandler, FC, useRef } from 'react';



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

export namespace SearchBar {
    export type Props = (
        RT.PropsWithClassName
        & {
            placeholder: string;
            label: string;
            value: string;
            onChange: (value: string) => void;
        }
    );
}

export const SearchBar: FC<SearchBar.Props> = ({
    className = '',
    placeholder,
    label,
    value,
    onChange,
}) => {
    const { t } = useTrans();
    const inputRef = useRef<HTMLInputElement>(null);
    const inputProps = Form.Inputs.TextInput.useTextInputDefaults({});

    const handleClick = useFunction(() => {
        if (!inputRef.current) return;
        inputRef.current.focus();
    });

    const handleChange: ChangeEventHandler<
        HTMLInputElement
    > = useFunction((e) => {
        onChange(e.target.value);
    });

    const sprite = (
        value
            ? ASSETS.IMAGES.SPRITE.CROSS_ICON
            : ASSETS.IMAGES.SPRITE.SEARCH_ICON
    );

    const buttonLabel = (
        value
            ? t('SearchBar.clearSearch')
            : t('SearchBar.focusSearch')
    );

    return (
        <Form.Inputs.TextInput.Wrapper className={cn(
            styles.wrapper,
            className,
        )}>
            <Form.Inputs.TextInput.NodePure
                {...inputProps}
                className={styles.input}
                name='search'
                placeholder={placeholder}
                value={value}
                label={label}
                error={null}
                errorId=''
                id=''
                onBlur={noop}
                type='text'
                onChange={handleChange}
            />

            <Button
                className={styles.button}
                label={buttonLabel}
                onLeftClick={handleClick}
            >
                <Sprite
                    className={styles.icon}
                    sprite={sprite}
                />
            </Button>
        </Form.Inputs.TextInput.Wrapper>
    );
};