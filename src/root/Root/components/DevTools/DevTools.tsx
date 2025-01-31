import { Button, Iterate, Modal, Overlay } from '@components';
import { createStyles, createWithDecorator, logger } from '@utils';
import { FC, useMemo } from 'react';
import { useDevTools } from './hooks';
import { Focus, useRefManager } from '@lesnoypudge/utils-react';
import { useHotKey } from '@hooks';
import { KEY } from '@lesnoypudge/utils';
import { rawActions } from './actions';



const styles = createStyles({
    inner: 'flex flex-col gap-2 p-2',
    action: `
        px-2
        py-1
        focus-visible:bg-white 
        focus-visible:text-black
    `,
});

const { withDecorator } = createWithDecorator(({ children }) => {
    const controls = Overlay.useOverlayControls();

    useHotKey(document, [KEY.Shift, KEY.Control, KEY.P], (e) => {
        e.preventDefault();
        controls.open();
    });

    useHotKey(
        document,
        [KEY.F1],
        rawActions.clearConsole,
        { hotKeyOptions: { prevent: true } },
    );

    useHotKey(
        document,
        [KEY.F2],
        () => logger.log(document.activeElement),
        { hotKeyOptions: { prevent: true } },
    );

    return (
        <Modal.Base.Provider controls={controls} label='devtools'>
            <Modal.Base.Wrapper>
                {children}
            </Modal.Base.Wrapper>
        </Modal.Base.Provider>
    );
});



export const DevTools: FC = withDecorator(() => {
    const {
        actions,
        getIsFocused,
        getTabIndex,
        wrapperRef,
        setCurrentFocusedId,
    } = useDevTools();

    const Item: FC<{ actionName: keyof typeof actions }> = ({ actionName }) => {
        const containerRef = useRefManager<HTMLButtonElement>(null);
        return (
            <Focus.Inside
                isEnabled={getIsFocused(actionName)}
                containerRef={containerRef}
            >
                <Button
                    className={styles.action}
                    onLeftClick={() => {
                        actions[actionName]();
                        setCurrentFocusedId(actionName);
                    }}
                    tabIndex={getTabIndex(actionName)}
                    innerRef={containerRef}
                >
                    {actionName}
                </Button>
            </Focus.Inside>
        );
    };

    return (
        <div
            className={styles.inner}
            ref={wrapperRef}
        >
            <Iterate items={Object.keys<typeof actions>(actions)}>
                {(actionName) => (
                    <Item
                        actionName={actionName}
                        key={actionName}
                    />
                )}
            </Iterate>
        </div>
    );
});