import { Dialog } from '@components';
import { useKeyBind } from '@hooks';
import { KEY } from '@lesnoypudge/utils';
import { useContextProxy } from '@lesnoypudge/utils-react';
import { createVariants } from '@utils';
import { FC } from 'react';



const variants = createVariants({
    initial: {
        opacity: 0,
    },
    animate: {
        opacity: 1,
    },
    exit: {
        opacity: 0,
    },
});

const DevToolsInner: FC = () => {
    const {
        openOverlay,
    } = useContextProxy(Dialog.Context);

    useKeyBind(document, [KEY.Shift, KEY.Control, KEY.P], (e) => {
        e.preventDefault();
        console.log('wiw');
        openOverlay();
    });

    return (
        <>
            <button onClick={openOverlay}>open</button>
            <Dialog.Wrapper>
                <div>
                    wowowwo
                </div>
            </Dialog.Wrapper>
        </>
    );
};

export const DevTools: FC = () => {
    return (
        <Dialog.Provider
            label='devtools'
            focused
            withBackdrop
            animationVariants={variants}
        >
            <DevToolsInner/>
        </Dialog.Provider>
    );
};