import { FC, useRef } from 'react';
import { Types } from '../../types';
import { FeedContext } from '../../context';
import { useDeriveFeedState, useInfiniteLoader } from './hooks';



export const FeedProvider: FC<Types.FeedProvider.Props> = ({
    textChatId,
    children,
}) => {
    const feedRef: Types.Context['feedRef'] = useRef(null);
    const scrollableRef: Types.Context['scrollableRef'] = useRef(null);
    const virtualizerRef: Types.Context['virtualizerRef'] = useRef(null);

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
        messagePlaceholderHeight: 600,
        feedRef,
        scrollableRef,
        virtualizerRef,
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