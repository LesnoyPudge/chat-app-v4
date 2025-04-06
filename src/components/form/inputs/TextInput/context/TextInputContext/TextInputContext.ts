import { ContextSelectable } from '@lesnoypudge/utils-react';
import { Types } from '../../types';



export type TextInputContext = Types.Context;

export const TextInputContext = ContextSelectable.createContext<
    TextInputContext
>();