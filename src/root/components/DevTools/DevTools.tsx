import { Button, DialogBlocks, KeyboardNavigation, Overlay } from '@/components';
import { createStyles, logger } from '@/utils';
import { FC, useRef } from 'react';
import { useDevTools } from './hooks';
import { KEY } from '@lesnoypudge/utils';
import { rawActions } from './actions';
import { createWithDecorator, Iterate, useHotKey } from '@lesnoypudge/utils-react';



const styles = createStyles({
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
        isFocused,
        setFocusId,
        tabIndex,
    } = KeyboardNavigation.useCommonItem({
        elementRef,
        itemId: actionName,
    });
    return (
        <Button
            className={styles.action}
            onAnyClick={setFocusId}
            onLeftClick={actionFn}
            isActive={isFocused}
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
        controls.open,
        { hotKeyOptions: { prevent: true } },
    );

    useHotKey(
        document,
        [KEY.F4],
        rawActions.logElementsCount,
        { hotKeyOptions: { prevent: true } },
    );

    return (
        <DialogBlocks.Base.Provider
            controls={controls}
            label='devtools'
        >
            <DialogBlocks.Base.Wrapper>
                {children}
            </DialogBlocks.Base.Wrapper>
        </DialogBlocks.Base.Provider>
    );
});

export const DevTools: FC = withDecorator(() => {
    const {
        actions,
        wrapperRef,
    } = useDevTools();

    const items = Object.keys<typeof actions>(actions);

    return (
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
    );
});