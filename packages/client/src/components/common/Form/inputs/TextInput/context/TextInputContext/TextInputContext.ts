import { createContextSelectable } from '@lesnoypudge/utils-react';
import { TextInputTypes } from '../../textInputTypes';



export type TextInputContext = TextInputTypes.Context;

export const TextInputContext = createContextSelectable<
    TextInputContext
>();