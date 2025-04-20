import { Scrollable } from '@/components';
import { mutate } from '@lesnoypudge/utils-react';
import {
    ClickScrollPlugin,
    OverlayScrollbars,
    ScrollbarsHidingPlugin,
} from 'overlayscrollbars';
import { MutableRefObject, useLayoutEffect, useRef } from 'react';



type Props = Scrollable.WithExposedApi & Scrollable.Hooks.Options;

type Return = (
    Scrollable.Hooks.WithInstanceRef
    & {
        wrapperRef: MutableRefObject<HTMLDivElement | null>;
        scrollableRef: MutableRefObject<HTMLDivElement | null>;
    }
);

OverlayScrollbars.plugin(ClickScrollPlugin);
OverlayScrollbars.plugin(ScrollbarsHidingPlugin);

const createApi = (instance: Scrollable.Instance): Scrollable.Api => {
    return instance;
};

export const useInit = ({
    apiRef,
    autoHide,
    direction,
}: Props): Return => {
    const instanceRef = useRef<Scrollable.Instance>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const scrollableRef = useRef<HTMLDivElement>(null);

    // initialization
    useLayoutEffect(() => {
        const wrapper = wrapperRef.current;
        const viewport = scrollableRef.current;
        if (!wrapper || !viewport) return;

        const instance = OverlayScrollbars({
            target: wrapper,
            elements: {
                host: wrapper,
                content: viewport,
                viewport,
            },
        }, {});

        instanceRef.current = instance;

        return () => {
            instance.destroy();
            instanceRef.current = null;
        };
    }, []);

    // option update
    useLayoutEffect(() => {
        const instance = instanceRef.current;
        if (!instance) return;

        const showXAxis = direction === 'horizontal' || direction === 'both';
        const showYAxis = direction === 'vertical' || direction === 'both';

        instance.options({
            overflow: {
                x: showXAxis ? 'scroll' : 'hidden',
                y: showYAxis ? 'scroll' : 'hidden',
            },
            paddingAbsolute: true,
            scrollbars: {
                clickScroll: true,
                dragScroll: true,
                visibility: 'auto',
                autoHideSuspend: false,
                autoHideDelay: 3_000,
                autoHide: autoHide ? 'leave' : 'never',
                theme: 'os-theme-custom',
            },
        });
    }, [autoHide, direction]);

    // api exposure
    useLayoutEffect(() => {
        if (!apiRef) return;

        const instance = instanceRef.current;
        if (!instance) return;

        mutate(apiRef, 'current', createApi(instance));

        return () => {
            mutate(apiRef, 'current', null);
        };
    }, [apiRef]);

    return {
        instanceRef,
        scrollableRef,
        wrapperRef,
    };
};