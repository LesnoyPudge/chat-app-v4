import { Types } from '../../types';
import { cn, createStyles } from '@/utils';
import { createWithDecorator } from '@lesnoypudge/utils-react';
import { MessageControlBar, MessageProvider } from './components';
import { T } from '@lesnoypudge/types-utils-base/namespace';
import { useMessageContext, useMessageRedactorContext } from '../../hooks';
import { toOneLine } from '@lesnoypudge/utils';



const styles = createStyles({
    wrapper: `
        group/message 
        relative 
        bg-primary-200 
        hover-focus-within:bg-primary-300
    `,
});


type DecoratorProps = T.Except<
    Types.Node.Props,
    'className' | 'innerRef'
>;

const {
    withDecorator,
} = createWithDecorator<DecoratorProps>(({
    children,
    ...props
}) => {
    return (
        <MessageProvider {...props}>
            {children}
        </MessageProvider>
    );
});

type NodeProps = T.Except<
    Types.Node.Props,
    keyof DecoratorProps
>;

export const MessageNode = withDecorator<NodeProps>(({
    className = '',
    innerRef,
}) => {
    const {
        messageDisplayMode,
        editTimestampId,
        tabIndex,
        timestampId,
        usernameId,
        contentId,
        message,
    } = useMessageContext();

    const { getIsRedactorActive } = useMessageRedactorContext();

    const isCompact = messageDisplayMode === 'compact';
    const isCozy = messageDisplayMode === 'cozy';

    return (
        <article
            className={cn(styles.wrapper, className)}
            aria-hidden={false}
            aria-setsize={-1}
            tabIndex={tabIndex}
            aria-labelledby={toOneLine(`
                ${timestampId} 
                ${usernameId} 
                ${contentId} 
                ${editTimestampId}
            `)}
            ref={innerRef}
        >
            <If condition={isCompact}>
                <CompactMessage/>
            </If>

            <If condition={isCozy}>
                <CozyMessage/>
            </If>

            <If condition={!getIsRedactorActive(message.id)}>
                <MessageControlBar/>
            </If>
        </article>
    );
});