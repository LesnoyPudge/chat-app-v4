import { Button, KeyboardNavigation, Overlay, Scrollable } from '@/components';
import { createStyles, getHTMLElement, logger } from '@/utils';
import { FC, useRef } from 'react';
import { useDevTools } from './hooks';
import { KEY } from '@lesnoypudge/utils';
import { rawActions } from './actions';
import {
    createWithDecorator,
    Focus,
    Iterate,
    useHotKey,
} from '@lesnoypudge/utils-react';
import { createPortal } from 'react-dom';



const styles = createStyles({
    wrapper: 'pointer-events-auto fixed inset-0 grid place-items-center',
    scrollable: 'h-[70dvh] bg-black',
    inner: 'flex flex-col gap-2 p-2',
    action: `
        px-2
        py-1
        focus-visible:bg-white 
        focus-visible:text-black
    `,
});

type ItemProps = {
    actionName: string;
    actionFn: VoidFunction;
};

const Item: FC<ItemProps> = ({
    actionName,
    actionFn,
}) => {
    const elementRef = useRef<HTMLButtonElement>(null);
    const {
        isCurrentId,
        setId,
        tabIndex,
    } = KeyboardNavigation.useCommonItem({
        elementRef,
        itemId: actionName,
    });
    return (
        <Button
            className={styles.action}
            onAnyClick={setId}
            onLeftClick={actionFn}
            isActive={isCurrentId}
            tabIndex={tabIndex}
            innerRef={elementRef}
        >
            {actionName}
        </Button>
    );
};

const { withDecorator } = createWithDecorator(({ children }) => {
    const controls = Overlay.useControls();

    useHotKey(
        document,
        [KEY.F1],
        rawActions.clearConsole,
        { hotKeyOptions: { prevent: true } },
    );

    useHotKey(
        document,
        [KEY.F2],
        () => logger._common.log(document.activeElement),
        { hotKeyOptions: { prevent: true } },
    );

    useHotKey(
        document,
        [KEY.F3],
        controls.toggle,
        { hotKeyOptions: { prevent: true } },
    );

    useHotKey(
        document,
        [KEY.F4],
        rawActions.logElementsCount,
        { hotKeyOptions: { prevent: true } },
    );

    useHotKey(
        document,
        [KEY.Escape],
        controls.close,
    );

    if (!controls.isOpen) return null;

    return createPortal(children, getHTMLElement.devRoot);
});

export const DevTools: FC = withDecorator(() => {
    const {
        actions,
        wrapperRef,
    } = useDevTools();

    const items = Object.keys<typeof actions>(actions);

    return (
        <Focus.Lock autoFocus enabled returnFocus>
            <div className={styles.wrapper}>
                <Scrollable className={styles.scrollable}>
                    <div
                        className={styles.inner}
                        ref={wrapperRef}
                    >
                        <KeyboardNavigation.Provider
                            list={items}
                            wrapperRef={wrapperRef}
                            loop
                        >
                            <Iterate
                                items={items}
                                getKey={(_, i) => i}
                            >
                                {(actionName) => (
                                    <Item
                                        actionName={actionName}
                                        actionFn={actions[actionName]}
                                    />
                                )}
                            </Iterate>
                        </KeyboardNavigation.Provider>
                    </div>
                </Scrollable>
            </div>
        </Focus.Lock>
    );
});