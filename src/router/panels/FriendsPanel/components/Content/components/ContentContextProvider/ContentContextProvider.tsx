import { FC, PropsWithChildren, useState } from 'react';
import { ContentContext } from '../../context';



export namespace ContentContextProvider {
    export type Props = (
        PropsWithChildren
        & {
            searchValue: string;
        }
    );
}

export const ContentContextProvider: FC<ContentContextProvider.Props> = ({
    searchValue,
    children,
}) => {
    const [displayCount, setDisplayCount] = useState(0);

    const shouldShowList = !!displayCount;
    const shouldShowEmptyBlock = !shouldShowList;

    const value: ContentContext = {
        displayCount,
        setDisplayCount,
        searchValue,
        shouldShowEmptyBlock,
        shouldShowList,
    };

    return (
        <ContentContext.Provider value={value}>
            {children}
        </ContentContext.Provider>
    );
};