import { Button, Dialog, Iterate, Scrollable } from '@components';
import { createStyles } from '@utils';
import { FC } from 'react';
import { useDevTools } from './hooks';
import { Focus } from '@lesnoypudge/utils-react';



const styles = createStyles({
    wrapper: `
        pointer-events-auto
        absolute
        left-1/2
        top-1/2
        w-fit
        -translate-x-1/2
        -translate-y-1/2
        bg-black 
        p-3 
        font-semibold 
        text-white 
        outline-2
        outline-red-700
    `,
    scrollable: 'max-h-[90dvh] py-4',
    inner: 'flex flex-col gap-2 ',
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
        state,
        getIsFocused,
        getTabIndex,
        wrapperRef,
        setCurrentFocusedId,
    } = useDevTools();

    return (
        <Dialog.Provider
            label='devtools'
            focused
            outerState={state.value}
            withBackdrop
            onChange={state.setValue}
        >
            <Dialog.Wrapper>
                <div className={styles.wrapper}>
                    <Scrollable className={styles.scrollable}>
                        <div
                            className={styles.inner}
                            ref={wrapperRef}
                        >
                            <Iterate items={Object.keys(actions)}>
                                {(actionName) => (
                                    <Focus.Inside<HTMLButtonElement>
                                        enabled={getIsFocused(actionName)}
                                        key={actionName}
                                    >
                                        {({ containerRef }) => (
                                            <Button
                                                className={styles.action}
                                                onLeftClick={() => {
                                                    void actions[actionName]?.();
                                                    setCurrentFocusedId(actionName);
                                                }}
                                                tabIndex={getTabIndex(actionName)}
                                                innerRef={containerRef}
                                            >
                                                {actionName}
                                            </Button>
                                        )}
                                    </Focus.Inside>
                                )}
                            </Iterate>
                        </div>
                    </Scrollable>
                </div>
            </Dialog.Wrapper>
        </Dialog.Provider>
    );
};