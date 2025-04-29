import { PropsWithChildren, RefObject } from 'react';
import { Scrollable } from '@/components';
import { useRefManager } from '@lesnoypudge/utils-react';



export namespace Types {
    export type Context = {
        textChatId: string;
        feedRef: useRefManager.NullableRefManager<HTMLDivElement>;
        scrollableRef: RefObject<HTMLDivElement>;
        scrollableApiRef: useRefManager.NullableRefManager<Scrollable.Api>;
        shouldShowPlaceholder: boolean;
        shouldShowMessagePlaceholder: boolean;
        shouldShowIntroduction: boolean;
        shouldShowEmptyIntroduction: boolean;
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