import { Store } from '@/features';
import { Types } from '../../../../types';
import { useFunction, useIntersectionObserver, useIsMounted, useMountEffect } from '@lesnoypudge/utils-react';
import { useEffect, useRef, useState } from 'react';



type Options = Pick<
    Types.Context,
    'textChatId'
    | 'messagesPlaceholderRef'
>;

export const useFeedScrollLoader = ({
    textChatId,
    messagesPlaceholderRef,
}: Options) => {
    const { getIsMounted } = useIsMounted();
    const intersectionTimeoutIdRef = useRef<number>();

    const [
        isIntersectingWithPlaceholder,
        setIsIntersectingWithPlaceholder,
    ] = useState(false);

    // delayed intersection update
    useIntersectionObserver(messagesPlaceholderRef, (entry) => {
        clearTimeout(intersectionTimeoutIdRef.current);

        intersectionTimeoutIdRef.current = setTimeout(() => {
            if (!getIsMounted()) return;

            setIsIntersectingWithPlaceholder(entry.isIntersecting);
        }, 500);
    });

    const [
        getMessagesTrigger,
        getMessagesHelpers,
    ] = Store.Messages.Api.useLazyMessageGetManyByTextChatIdQuery();


    const firstDefinedMessageIndex = Store.useSelector(
        Store.TextChats.Selectors
            .selectFirstDefinedMessageIndexById(textChatId),
    );

    const fetchFn = useFunction(({
        from,
    }: { from: number | null }) => {
        void getMessagesTrigger({
            textChatId,
            from,
            limit: 50,
        });
    });

    // initial fetch
    useMountEffect(() => fetchFn({ from: null }));

    // fetch on intersection with placeholder
    useEffect(() => {
        if (!isIntersectingWithPlaceholder) return;
        if (getMessagesHelpers.isFetching) return;
        if (!firstDefinedMessageIndex) return;

        fetchFn({ from: firstDefinedMessageIndex });
    }, [
        fetchFn,
        firstDefinedMessageIndex,
        isIntersectingWithPlaceholder,
        getMessagesHelpers.isFetching,
    ]);

    const isTextChatExists = Store.useSelector(
        Store.TextChats.Selectors.selectIsExistsById(textChatId),
    );

    const definedMessageIds = Store.useSelector(
        Store.TextChats.Selectors.selectDefinedMessageIdsById(textChatId),
    );
    const definedMessageCount = definedMessageIds?.length ?? 0;

    const isFirstFetch = (
        getMessagesHelpers.isLoading
        || getMessagesHelpers.isUninitialized
    );

    // first render, waiting for possible messages
    const shouldShowPlaceholder = (
        !isTextChatExists
        || (
            definedMessageCount === 0
            && isFirstFetch
        )
    );

    // we have some messages in store.
    // this is only for message list
    const shouldShowMessageList = (
        definedMessageCount !== 0
    );

    // there is unloaded messages
    const shouldShowMessagePlaceholder = (
        firstDefinedMessageIndex !== 0
    );

    // there is no unloaded messages, should show intro
    const shouldShowIntroduction = (
        !shouldShowMessagePlaceholder
    );

    // there is no messages yet
    const shouldShowEmptyIntroduction = (
        shouldShowIntroduction
        && definedMessageCount === 0
    );

    return {
        shouldShowPlaceholder,
        shouldShowMessageList,
        shouldShowMessagePlaceholder,
        shouldShowIntroduction,
        shouldShowEmptyIntroduction,
    };
};