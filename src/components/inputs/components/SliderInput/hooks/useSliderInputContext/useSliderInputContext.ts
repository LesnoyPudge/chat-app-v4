import { ContextSelectable } from '@lesnoypudge/utils-react';
import { SliderInputContext } from '../../context';



export const useSliderInputContext = () => {
    return ContextSelectable.useProxy(SliderInputContext);
};