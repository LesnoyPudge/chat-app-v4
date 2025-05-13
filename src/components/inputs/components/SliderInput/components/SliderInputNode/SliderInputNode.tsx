import { cn } from '@/utils';
import { useMergeRefs } from '@lesnoypudge/utils-react';
import { FC } from 'react';
import { useSliderInputContext } from '../../hooks';
import { useSliderInput } from './hooks';
import { SliderInputTypes } from '../../types';
import './SliderInput.scss';
import 'nouislider/dist/nouislider.css';



export const SliderInputNode: FC<SliderInputTypes.Node.Props> = ({
    className = '',
}) => {
    const { innerRef } = useSliderInputContext();
    const { sliderRef } = useSliderInput();

    const ref = useMergeRefs([sliderRef, innerRef]);

    return (
        <div className={cn('SliderInput', className)}>
            <div ref={ref}></div>
        </div>
    );
};