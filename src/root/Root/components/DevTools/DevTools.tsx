import { Button, CustomizableList, Modal, Overlay } from '@components';
import { createStyles, logger } from '@utils';
import { FC } from 'react';
import { useDevTools } from './hooks';
import { KEY } from '@lesnoypudge/utils';
import { rawActions } from './actions';
import { createWithDecorator, useHotKey } from '@lesnoypudge/utils-react';



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

    useHotKey(
        document,
        [KEY.F3],
        controls.open,
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
        wrapperRef,
    } = useDevTools();

    const items = Object.keys<typeof actions>(actions);

    return (
        <div
            className={styles.inner}
            ref={wrapperRef}
        >
            <CustomizableList
                wrapperRef={wrapperRef}
                items={items}
                getId={(index) => String(items[index])}
                direction='vertical'
                loop
            >
                {({ item, itemRef, tabIndex, setCurrentFocusedId }) => (
                    <Button
                        className={styles.action}
                        onLeftClick={() => {
                            actions[item]();
                            setCurrentFocusedId(item);
                        }}
                        tabIndex={tabIndex}
                        innerRef={itemRef}
                    >
                        {item}
                    </Button>
                )}
            </CustomizableList>
        </div>
    );
});