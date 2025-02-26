import { FC } from 'react';
import { cn, createStyles, getHTMLElement } from '@utils';
import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { Focus, ContextSelectable } from '@lesnoypudge/utils-react';
import { PopoverContext } from '../../context';



const styles = createStyles({
    lock: 'h-dvh w-dvw overflow-hidden',
});

const visibleElements = [getHTMLElement.H1];

export namespace PopoverWrapper {
    export type Props = RT.PropsWithChildrenAndClassName;
}

export const PopoverWrapper: FC<PopoverWrapper.Props> = ({
    className = '',
    children,
}) => {
    const {
        focused,
        handleClickOutside,
        handleEscape,
    } = ContextSelectable.useProxy(PopoverContext);

    return (
        <Focus.Lock
            className={cn(styles.lock, className)}
            returnFocus
            autoFocus={focused}
            enabled={focused}
            focusLock
            shards={visibleElements}
            preventScrollOnFocus
            scrollLock
            onClickOutside={handleClickOutside}
            onEscapeKey={handleEscape}
        >
            {children}
        </Focus.Lock>
    );
};