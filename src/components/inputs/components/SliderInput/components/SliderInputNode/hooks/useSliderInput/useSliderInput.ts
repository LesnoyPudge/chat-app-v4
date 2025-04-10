import { useLayoutEffect, useMemo, useRef } from 'react';
import { API, Options, PipsMode, create } from 'nouislider';
import {
    useRefManager,
    useFunction,
    useLatest,
    useMemoShallow,
    useUpdateEffect,
} from '@lesnoypudge/utils-react';
import { invariant, sortFns } from '@lesnoypudge/utils';
import { addEventListener, isHtmlElement } from '@lesnoypudge/utils-web';
import { useSliderInputContext } from '../../../../hooks';


type SliderRange = {
    min: number;
    max: number;
    [key: `${number}%`]: number;
};

const toValidRange = (providedInvalidRange: number[]) => {
    const invalidRange = providedInvalidRange.toSorted(sortFns.smallToBig);

    const minValue = invalidRange[0];
    invariant(minValue);
    const maxValue = invalidRange.at(-1);
    invariant(maxValue);

    const result = invalidRange.reduce<SliderRange>((acc, cur, index) => {
        if (index === 0) {
            acc.min = cur;
            return acc;
        }

        if (index === invalidRange.length - 1) {
            acc.max = cur;
            return acc;
        }

        const result = (cur - minValue) * 100 / (maxValue - minValue);
        acc[`${result}%`] = cur;

        return acc;
    }, {});

    return result;
};

export const useSliderInput = () => {
    const {
        value,
        range,
        format,
        name,
        label,
        setValue,
        onBlur,
    } = useSliderInputContext();
    const sliderRef = useRefManager<HTMLDivElement>(null);

    const sliderApiRef = useRef<API>(null);

    const validRange = useMemoShallow(toValidRange(range));
    const startRef = useLatest(value);

    const sliderOptions = useMemo<Options>(() => ({
        range: validRange,
        start: startRef.current,
        connect: [true, false],
        keyboardSupport: true,
        snap: true,
        pips: {
            mode: PipsMode.Steps,
            format,
        },
    }), [format, validRange, startRef]);

    const handleClick = useFunction((e: MouseEvent) => {
        if (!sliderApiRef.current) return;

        const currentTarget = e.currentTarget;
        if (!currentTarget) return;
        if (!isHtmlElement(currentTarget)) return;

        const dataset = currentTarget.dataset;
        if (!('value' in dataset)) return;
        if (dataset.value === undefined) return;

        sliderApiRef.current.set(Number.parseInt(dataset.value));
    });

    useLayoutEffect(() => {
        return sliderRef.effect((element) => {
            if (!element) return;

            const sliderApi = create(element, sliderOptions);
            sliderApiRef.current = sliderApi;

            const pips = element.querySelectorAll('div.noUi-value');
            invariant(pips);

            const pipListeners = [...pips].map((pip) => {
                return addEventListener(pip, 'click', handleClick);
            });

            sliderApi.on('update', (_, __, [value]) => {
                if (value === undefined) return;

                setValue(value);
            });

            const handle = element.querySelector('div.noUi-handle');
            invariant(handle);

            handle.setAttribute('name', name);
            handle.setAttribute('aria-label', label);

            const blurUnsub = addEventListener(handle, 'blur', onBlur);

            return () => {
                sliderApiRef.current = null;
                sliderApi.destroy();
                pipListeners.forEach((unsub) => unsub());
                blurUnsub();
            };
        });
    }, [handleClick, label, name, onBlur, setValue, sliderOptions, sliderRef]);

    useUpdateEffect(() => {
        if (!sliderApiRef.current) return;
        if (sliderApiRef.current.get(true) === value) return;

        sliderApiRef.current.set(value);
    }, [value]);

    return {
        sliderRef,
    };
};