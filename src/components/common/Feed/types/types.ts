import { useRefManager } from '@lesnoypudge/utils-react';
import { PropsWithChildren } from 'react';
import { VirtualRender } from '../../VirtualRender';
import { Scrollable } from '@/components';



export namespace Types {
    export type Context = {
        textChatId: string;
        messageIds: string[];
        feedRef: useRefManager.NullableRefManager<HTMLDivElement>;
        autoscrollTriggerRef: useRefManager.NullableRefManager<HTMLDivElement>;
        virtualRenderApiRef: (
            useRefManager.NullableRefManager<VirtualRender.Types.Api>
        );
        messagesPlaceholderRef: (
            useRefManager.NullableRefManager<HTMLDivElement>
        );
        scrollableWrapperRef: (
            useRefManager.NullableRefManager<HTMLDivElement>
        );
        scrollableRef: (
            useRefManager.NullableRefManager<HTMLDivElement>
        );
        scrollableApiRef: (
            useRefManager.NullableRefManager<Scrollable.Api>
        );
        shouldShowPlaceholder: boolean;
        shouldShowMessageList: boolean;
        shouldShowMessagePlaceholder: boolean;
        shouldShowIntroduction: boolean;
        shouldShowEmptyIntroduction: boolean;
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
}