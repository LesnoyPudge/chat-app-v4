import { T } from '@lesnoypudge/types-utils-base/namespace';
import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { PropsWithInnerRef } from '@types';
import { cn } from '@utils';
import { FC } from 'react';
import { styles } from './styles';



export namespace Button {
    type StylingPresets = (
        'brand'
        | 'link'
        | 'lite'
        | 'brandNeutral'
        | 'brandDanger'
        | 'brandPositive'
        | 'invisibleBrand'
    );

    export type Props = T.Simplify<
        RT.PropsWithChildrenAndClassName
        & PropsWithInnerRef<'button'>
        & {
            id?: string;
            style?: React.CSSProperties;
            stylingPreset?: StylingPresets;
            size?: 'small' | 'medium' | 'big';
            type?: 'button' | 'submit' | 'reset';
            isActive?: boolean;
            isDisabled?: boolean;
            isLoading?: boolean;
            tabIndex?: number;
            label?: string;
            controls?: string;
            hasPopup?: 'dialog' | 'menu';
            role?: 'button' | 'menuitem' | 'tab';
            hidden?: boolean;
            onAnyClick?: (e?: React.MouseEvent | React.KeyboardEvent) => void;
            onLeftClick?: (e?: React.MouseEvent | React.KeyboardEvent) => void;
            onMiddleClick?: React.MouseEventHandler;
            onRightClick?: React.MouseEventHandler;
            onMouseEnter?: React.MouseEventHandler;
            onFocus?: React.FocusEventHandler;
        }
    >;
}

export const Button: FC<Button.Props> = ({
    className = '',
    id,
    style,
    size,
    stylingPreset,
    type = 'button',
    isActive = false,
    isDisabled = false,
    isLoading = false,
    tabIndex = 0,
    label,
    controls,
    hasPopup,
    role = 'button',
    hidden = false,
    children,
    innerRef,
    onAnyClick,
    onLeftClick,
    onMiddleClick,
    onRightClick,
    onMouseEnter,
    onFocus,
}) => {
    const handleLeftClickWithKeyboard: React.KeyboardEventHandler = (e) => {
        if (e.code !== 'Enter' && e.code !== 'Space') return;

        handleLeftClick(e);
    };

    const handleLeftClick = (e: React.MouseEvent | React.KeyboardEvent) => {
        if (!onAnyClick && !onLeftClick) return;

        e.preventDefault();

        if (onLeftClick) return onLeftClick(e);
        if (onAnyClick) return onAnyClick(e);
    };

    const handleRightClick: React.MouseEventHandler = (e) => {
        if (!onAnyClick && !onRightClick) return;

        e.preventDefault();

        if (onRightClick) return onRightClick(e);
        if (onAnyClick) return onAnyClick(e);
    };

    const handleMiddleClick: React.MouseEventHandler = (e) => {
        if (!onAnyClick && !onMiddleClick) return;
        if (e.button !== 1) return;

        e.preventDefault();

        if (onMiddleClick) return onMiddleClick(e);
        if (onAnyClick) return onAnyClick(e);
    };

    const middleClickFix: React.MouseEventHandler = (e) => {
        if (!onAnyClick && !onMiddleClick) return;
        if (e.button !== 1) return;

        e.preventDefault();
    };

    const withExpanded = !!hasPopup;
    const withPressed = role === 'button';
    const withSelected = role === 'tab';

    const isExpanded = withExpanded && isActive;
    const isPressed = withPressed && isActive;
    const isSelected = withSelected && isActive;
    const validTabIndex = hidden ? -1 : tabIndex;
    const disabledState = isDisabled || isLoading;

    return (
        <button
            className={cn(
                stylingPreset && styles.base,
                stylingPreset && styles[stylingPreset].base,
                stylingPreset && isActive && styles[stylingPreset].active,
                size && styles.sizes[size],
                className,
            )}
            id={id}
            style={style}
            type={type}
            data-active={isActive}
            data-disabled={disabledState}
            data-loading={isLoading}
            disabled={disabledState}
            tabIndex={validTabIndex}
            aria-label={label}
            aria-pressed={isPressed}
            aria-expanded={isExpanded}
            aria-selected={isSelected}
            aria-haspopup={hasPopup}
            aria-controls={controls}
            aria-hidden={hidden}
            aria-disabled={disabledState}
            role={role}
            ref={innerRef}
            onKeyDown={handleLeftClickWithKeyboard}
            onClick={handleLeftClick}
            onContextMenu={handleRightClick}
            onAuxClick={handleMiddleClick}
            onFocus={onFocus}
            onMouseEnter={onMouseEnter}
            onMouseDown={middleClickFix}
        >
            {children}
        </button>
    );
};