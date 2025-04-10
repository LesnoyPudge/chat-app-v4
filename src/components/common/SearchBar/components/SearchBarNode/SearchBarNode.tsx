import { Button, Inputs, Sprite } from '@/components';
import { ASSETS } from '@/generated/ASSETS';
import { useTrans } from '@/hooks';
import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { useFunction } from '@lesnoypudge/utils-react';
import { cn, createStyles } from '@/utils';
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

export namespace SearchBarNode {
    export type Props = (
        RT.PropsWithClassName
        & Pick<
            Inputs.TextInput.Types.Context,
            'placeholder'
            | 'label'
            | 'value'
            | 'setValue'
        >
    );
}

export const SearchBarNode: FC<SearchBarNode.Props> = ({
    className = '',
    placeholder,
    label,
    value,
    setValue,
}) => {
    const { t } = useTrans();
    const inputRef = useRef<HTMLInputElement>(null);

    const showClearButton = !!value;

    const handleClick = useFunction(() => {
        if (!inputRef.current) return;
        inputRef.current.focus();

        if (!showClearButton) return;

        setValue('');
    });

    const handleChange: (
        ChangeEventHandler<HTMLInputElement>
    ) = useFunction((e) => setValue(e.target.value));

    const sprite = (
        showClearButton
            ? ASSETS.IMAGES.SPRITE.CROSS_ICON
            : ASSETS.IMAGES.SPRITE.SEARCH_ICON
    );

    const buttonLabel = (
        showClearButton
            ? t('SearchBar.clearSearch')
            : t('SearchBar.focusSearch')
    );

    return (
        <Inputs.TextInput.Wrapper className={cn(
            styles.wrapper,
            className,
        )}>
            <Inputs.TextInput.NodePure
                name='search'
                value={value}
                label={label}
                type='text'
                placeholder={placeholder}
                onChange={handleChange}
                innerRef={inputRef}
                maxLength={64}
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
        </Inputs.TextInput.Wrapper>
    );
};