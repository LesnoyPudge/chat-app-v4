import { ClientEntities, PropsWithInnerRef } from '@/types';
import { EmojiPicker, RTE } from '@/components';
import { PropsWithChildren } from 'react';
import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { T } from '@lesnoypudge/types-utils-base/namespace';



export namespace Types {
    export type Context = T.Simplify<(
        Pick<ClientEntities.User.Settings, 'messageDisplayMode'>
        & {
            message: ClientEntities.Message.Base;
            timestampId: string;
            usernameId: string;
            contentId: string;
            editTimestampId: string;
            isGroupHead: boolean;
            tabIndex: number;
            toggleReaction: EmojiPicker.OnEmojiPick;
        }
    )>;

    export type MessageRedactorFormValues = {
        content: RTE.Types.Nodes;
    };

    export type RedactorContext = {
        activeMessageId: string | null;
        openRedactor: (messageId: string) => void;
        closeRedactor: () => void;
    };

    export namespace Node {
        export type Props = T.Simplify<(
            RT.PropsWithClassName
            & PropsWithInnerRef<'article'>
            & Pick<
                Context,
                'messageDisplayMode'
                | 'message'
                | 'isGroupHead'
                | 'tabIndex'
            >
        )>;
    }

    export namespace Provider {
        export type Props = T.Simplify<(
            PropsWithChildren
            & Pick<
                Context,
                'messageDisplayMode'
                | 'message'
                | 'isGroupHead'
                | 'tabIndex'
            >
        )>;
    }
}