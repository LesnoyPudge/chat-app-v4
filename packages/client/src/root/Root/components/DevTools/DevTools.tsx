import { Button, Iterate } from '@components';
import { createStyles } from '@utils';
import { FC } from 'react';
import { useDevTools } from './hooks';
import { Focus, useRefManager } from '@lesnoypudge/utils-react';
import { Modal } from '@entities';



const styles = createStyles({
    inner: 'flex flex-col gap-2 p-2',
    action: `
        px-2
        py-1
        focus-visible:bg-white 
        focus-visible:text-black
    `,
});

export const DevTools: FC = () => {
    const {
        actions,
        controls,
        getIsFocused,
        getTabIndex,
        wrapperRef,
        setCurrentFocusedId,
    } = useDevTools();

    const Item: FC<{ actionName: keyof typeof actions }> = ({ actionName }) => {
        const containerRef = useRefManager<HTMLButtonElement>(null);

        return (
            <Focus.Inside
                once
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
        <Modal.Base.Provider
            controls={controls}
            label='devtools'
        >
            <Modal.Base.Wrapper>
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
            </Modal.Base.Wrapper>
        </Modal.Base.Provider>
    );
};