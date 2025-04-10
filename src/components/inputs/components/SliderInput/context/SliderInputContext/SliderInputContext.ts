import { ContextSelectable } from '@lesnoypudge/utils-react';
import { SliderInputTypes } from '../../types';



export const SliderInputContext = ContextSelectable.createContext<
    SliderInputTypes.Context
>();