import { ContextSelectable } from '@lesnoypudge/utils-react';
import { Dispatch, SetStateAction } from 'react';



export type ContentContext = {
    displayCount: number;
    setDisplayCount: Dispatch<SetStateAction<number>>;
    shouldShowList: boolean;
    shouldShowEmptyBlock: boolean;
    searchValue: string;
};

export const ContentContext = ContextSelectable.createContext<
    ContentContext
>();