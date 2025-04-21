import { Types } from '../../types';
import { cn, createStyles } from '@/utils';
import { createWithDecorator, withDisplayName } from '@lesnoypudge/utils-react';
import { CompactMessage, CozyMessage, MessageControlBar, MessageProvider } from './components';
import { T } from '@lesnoypudge/types-utils-base/namespace';
import { useIsMessageRedactorActive, useMessageContext } from '../../hooks';
import { toOneLine } from '@lesnoypudge/utils';
import { decorate } from '@lesnoypudge/macro';
import { memo } from 'react';



const styles = createStyles({
    wrapper: `
        group/message
        relative 
        rounded-sm
        py-0.5
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

decorate(withDisplayName, 'MessageNode', decorate.target);
decorate(memo, decorate.target);

export const MessageNode = withDecorator<Types.Node.Props>(({
    className = '',
    innerRef,
    tabIndex,
}) => {
    const {
        messageDisplayMode,
        editTimestampId,
        timestampId,
        usernameId,
        contentId,
        message,
    } = useMessageContext();

    const isRedactorActive = useIsMessageRedactorActive(message.id);

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
            <If condition={!isRedactorActive}>
                <MessageControlBar/>
            </If>

            <If condition={isCompact}>
                <CompactMessage/>
            </If>

            <If condition={isCozy}>
                <CozyMessage/>
            </If>
        </article>
    );
});