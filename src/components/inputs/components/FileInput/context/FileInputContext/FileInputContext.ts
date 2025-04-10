import { ContextSelectable } from '@lesnoypudge/utils-react';
import { FileInputTypes } from '../../types';



export const FileInputContext = ContextSelectable.createContext<
    FileInputTypes.Context
>();