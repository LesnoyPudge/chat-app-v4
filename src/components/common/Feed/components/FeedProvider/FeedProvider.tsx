import { FC, useRef } from 'react';
import { Types } from '../../types';
import { FeedContext } from '../../context';
import { useDeriveFeedState, useInfiniteLoader } from './hooks';
import { useRefManager } from '@lesnoypudge/utils-react';



export const FeedProvider: FC<Types.FeedProvider.Props> = ({
    textChatId,
    children,
}) => {
    const feedRef: Types.Context['feedRef'] = useRefManager(null);
    const scrollableRef: Types.Context['scrollableRef'] = useRef(null);
    const scrollableApiRef: (
        Types.Context['scrollableApiRef']
    ) = useRefManager(null);

    const {
        isLoading,
        isUninitialized,
        loadMore,
    } = useInfiniteLoader({
        textChatId,
    });

    const {
        shouldShowPlaceholder,
        shouldShowMessagePlaceholder,
        shouldShowIntroduction,
        shouldShowEmptyIntroduction,
    } = useDeriveFeedState({
        isLoading,
        isUninitialized,
        textChatId,
    });

    const value: Types.Context = {
        textChatId,
        feedRef,
        scrollableRef,
        scrollableApiRef,
        loadMore,
        shouldShowEmptyIntroduction,
        shouldShowPlaceholder,
        shouldShowMessagePlaceholder,
        shouldShowIntroduction,
    };

    return (
        <FeedContext.Provider value={value}>
            {children}
        </FeedContext.Provider>
    );
};