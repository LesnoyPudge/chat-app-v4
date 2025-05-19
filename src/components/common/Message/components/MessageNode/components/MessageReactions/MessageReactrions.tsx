import { FC } from 'react';
import { cn, createStyles } from '@/utils';
import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { useMessageContext } from '../../../../hooks';
import { useTrans } from '@/hooks';
import { Iterate, useFunction, useRefManager } from '@lesnoypudge/utils-react';
import { ClientEntities } from '@/types';
import { Store } from '@/features';
import { Button, Emoji, Overlay } from '@/components';



const styles = createStyles({
    wrapper: 'flex flex-wrap gap-1 overflow-hidden',
    reactionButton: {
        base: `
            flex 
            items-center 
            rounded-md 
            px-1.5 
            py-0.5 
            text-sm 
            transition-all 
            duration-100 
            hover-focus-visible:bg-primary-hover
        `,
        active: 'bg-brand text-white hover-focus-visible:bg-brand-hover',
    },
    reaction: 'mr-1.5 size-4',
    tooltip: 'text-sm',
});

type ItemProps = (
    Pick<ClientEntities.Message.Reaction, 'code'>
    & {
        isActive: boolean;
        count: number;
    }
);

const Item: FC<ItemProps> = ({
    code,
    count,
    isActive,
}) => {
    const { toggleReaction, tabIndex } = useMessageContext();
    const ref = useRefManager<HTMLButtonElement>(null);

    const handleToggleReaction = useFunction(() => {
        toggleReaction(code);
    });

    return (
        <li>
            <Button
                className={cn(
                    styles.reactionButton.base,
                    isActive && styles.reactionButton.active,
                )}
                label={code}
                isActive={isActive}
                innerRef={ref}
                tabIndex={tabIndex}
                onLeftClick={handleToggleReaction}
            >
                <Emoji
                    className={styles.reaction}
                    code={code}
                />

                <div>{count}</div>
            </Button>

            <Overlay.Tooltip
                className={styles.tooltip}
                preferredAlignment='top'
                spacing={5}
                leaderElementRef={ref}
            >
                {code}
            </Overlay.Tooltip>
        </li>
    );
};

export const MessageReactions: FC<RT.PropsWithClassName> = ({
    className = '',
}) => {
    const { t } = useTrans();
    const { message } = useMessageContext();
    const userId = Store.useSelector(
        Store.Users.Selectors.selectCurrentUserId,
    );

    const filteredReactions = message.reactions.filter((v) => {
        return !!v.users.length;
    });

    if (!filteredReactions.length) return null;

    return (
        <ul
            className={cn(styles.wrapper, className)}
            aria-label={t('Message.Reactions.listLabel')}
        >
            <Iterate items={filteredReactions} getKey={(v) => v.code}>
                {(reaction) => (
                    <Item
                        code={reaction.code}
                        count={reaction.users.length}
                        isActive={reaction.users.includes(userId)}
                    />
                )}
            </Iterate>
        </ul>
    );
};