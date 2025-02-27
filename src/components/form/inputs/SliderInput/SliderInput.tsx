import { FC } from 'react';
import { PartialFormatter } from 'nouislider';
import 'nouislider/dist/nouislider.css';
import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { cn } from '@utils';
import './SliderInput.scss';
import { FieldApi } from '@tanstack/react-form';
import { useSliderInput } from './useSliderInput';



const defaultClassName = 'SliderInput';

export namespace SliderInputPure {
    export type Options = {
        name: string;
        label: string;
        value: number;
        range: number[];
        format?: PartialFormatter;
        onChange: (value: number) => void;
        onBlur: (e: FocusEvent) => void;
    };

    export type Props = (
        RT.PropsWithClassName
        & Options
    );
}

export const SliderInputPure: FC<SliderInputPure.Props> = ({
    className = '',
    ...options
}) => {
    const { sliderRef } = useSliderInput(options);

    return (
        <div className={cn(defaultClassName, className)}>
            <div ref={sliderRef}></div>
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