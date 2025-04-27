import { PropsWithChildren, RefObject } from 'react';
import { VirtualizerHandle } from 'virtua';



export namespace Types {
    export type Context = {
        textChatId: string;
        feedRef: RefObject<HTMLDivElement>;
        scrollableRef: RefObject<HTMLDivElement>;
        virtualizerRef: RefObject<VirtualizerHandle>;
        shouldShowPlaceholder: boolean;
        shouldShowMessagePlaceholder: boolean;
        shouldShowIntroduction: boolean;
        shouldShowEmptyIntroduction: boolean;
        messagePlaceholderHeight: 600;
        loadMore: (
            options: { from: number | null }
        ) => Promise<unknown> | undefined;
    };

    export namespace FeedProvider {
        export type OwnProps = Pick<
            Context,
            'textChatId'
        >;

        export type Props = (
            PropsWithChildren
            & OwnProps
        );
    }

    export namespace FeedPlaceholder {
        export type Props = {
            isStatic?: boolean;
        };
    }
}