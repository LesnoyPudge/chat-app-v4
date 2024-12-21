import { Button, Dialog, Iterate } from '@components';
import { createStyles, createVariants } from '@utils';
import { FC } from 'react';
import { useDevTools } from './hooks';
import { Focus } from '@lesnoypudge/utils-react';



// don't animate due to unloaded motion config
const variants = createVariants({
    initial: {},
    animate: {},
    exit: {},
});

const styles = createStyles({
    wrapper: `
        pointer-events-auto
        absolute
        left-1/2        
        top-1/2 
        m-3
        flex
        -translate-x-1/2 
        -translate-y-1/2 
        flex-col 
        gap-2 
        bg-black 
        p-3 
        font-semibold 
        text-white
    `,
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
        currentFocusedId,
        getIsFocused,
        getTabIndex,
        withFocusSet,
        wrapperRef,
    } = useDevTools();

    return (
        <Dialog.Provider
            label='devtools'
            focused
            outerState={state.value}
            withBackdrop
            onChange={state.setValue}
            animationVariants={variants}
        >
            <Dialog.Wrapper>
                <div>
                    {currentFocusedId}
                </div>

                <div
                    className={styles.wrapper}
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
                                        onAnyClick={withFocusSet(actionName)}
                                        onLeftClick={actions[actionName]}
                                        tabIndex={getTabIndex(actionName)}
                                        innerRef={containerRef}
                                    >
                                        {`enabled: ${getIsFocused(actionName)}`} {actionName}
                                    </Button>
                                )}
                            </Focus.Inside>
                        )}
                    </Iterate>
                </div>
            </Dialog.Wrapper>
        </Dialog.Provider>
    );
};