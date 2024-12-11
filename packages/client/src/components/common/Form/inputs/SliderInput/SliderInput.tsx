import { FC, useEffect, useLayoutEffect, useRef } from 'react';
import { PartialFormatter, API, Options, PipsMode, create } from 'nouislider';
import 'nouislider/dist/nouislider.css';
import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { invariant } from '@lesnoypudge/utils';
import { cn } from '@utils';
import './SliderInput.scss';
import { useConst, useFunction, useUpdateEffect } from '@lesnoypudge/utils-react';
import { addEventListener, isHtmlElement } from '@lesnoypudge/utils-web';
import { FieldApi } from '@tanstack/react-form';



type SliderRange = {
    min: number;
    max: number;
    [key: `${number}%`]: number;
};

const baseClassName = 'SliderInput';

const defaultFormat = {
    to: (value: number) => {
        return `${value}px`;
    },
} satisfies PartialFormatter;

const toValidRange = (invalidRange: number[]) => {
    invalidRange = invalidRange.sort((a, b) => a - b);

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

export namespace SliderInputPure {
    export type Props = (
        RT.PropsWithClassName
        & {
            name: string;
            label: string;
            value: number;
            range: number[];
            format?: PartialFormatter;
            onChange: (value: number) => void;
            onBlur: (e: FocusEvent) => void;
        }
    );
}

export const SliderInputPure: FC<SliderInputPure.Props> = ({
    className = '',
    name,
    label,
    value,
    range,
    format = defaultFormat,
    onChange,
    onBlur,
}) => {
    const elementRef = useRef<HTMLDivElement>(null);
    const sliderApiRef = useRef<API>(null);
    const sliderOptions = useConst<Options>(() => ({
        range: toValidRange(range),
        start: value,
        connect: [true, false],
        keyboardSupport: true,
        snap: true,
        pips: {
            mode: PipsMode.Steps,
            format,
        },
    }));

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
        const element = elementRef.current;
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

            onChange(value);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [name, label]);

    useUpdateEffect(() => {
        if (!sliderApiRef.current) return;
        if (sliderApiRef.current.get(true) === value) return;

        sliderApiRef.current.set(value);
    }, [value]);

    return (
        <div className={cn(baseClassName, className)}>
            <div ref={elementRef}></div>
        </div>
    );
};

export namespace SliderInput {
    export type Props = (
        Pick<
            SliderInputPure.Props,
            'className'
            | 'format'
            | 'label'
            | 'range'
        >
        & {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            field: FieldApi<any, any, any, any, number>;
        }
    );
}

export const SliderInput: FC<SliderInput.Props> = ({
    field,
    ...rest
}) => {
    return (
        <SliderInputPure
            name={field.name}
            value={field.state.value}
            onChange={field.handleChange}
            onBlur={field.handleBlur}
            {...rest}
        />
    );
};