import { Inputs } from '@/components';
import { getHTMLElement } from '@/utils';
import { useEventListener, useRefManager } from '@lesnoypudge/utils-react';
import { useRef } from 'react';



type Props = {
    onDragStart: VoidFunction;
    onDragEnd: VoidFunction;
};

export const useFileDrop = ({
    onDragEnd,
    onDragStart,
}: Props) => {
    const appRootRef = useRefManager(getHTMLElement.appRoot);
    const isDragOverRef = useRef(false);
    const dragOverCounterRef = useRef(0);
    const { onFileChange } = Inputs.FileInput.useOnChange();

    const counterHelpers = {
        reset: () => {
            dragOverCounterRef.current = 0;
        },
        increase: () => {
            dragOverCounterRef.current++;
        },
        reduce: () => {
            dragOverCounterRef.current = Math.max(
                0,
                dragOverCounterRef.current - 1,
            );
        },
        isZero: () => {
            return dragOverCounterRef.current === 0;
        },
    };

    const changeDragOverState = () => {
        const isDrugging = !!dragOverCounterRef.current;
        if (isDrugging === isDragOverRef.current) return;

        isDragOverRef.current = isDrugging;

        if (isDrugging) {
            onDragStart();
        } else {
            onDragEnd();
        }
    };

    useEventListener(appRootRef, 'dragenter', (e) => {
        if (!e.dataTransfer?.types.includes('Files')) return;

        counterHelpers.increase();
        changeDragOverState();
    });

    useEventListener(appRootRef, 'dragleave', () => {
        if (counterHelpers.isZero()) return;
        counterHelpers.reduce();
        changeDragOverState();
    });

    useEventListener(appRootRef, 'drop', (e) => {
        if (counterHelpers.isZero()) return;
        counterHelpers.reset();
        changeDragOverState();

        if (!e.dataTransfer?.files) return;

        onFileChange(e.dataTransfer.files);
    });
};