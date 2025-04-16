import { ClientEntities } from '@/types';
import { cn, createStyles } from '@/utils';
import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { FC, memo } from 'react';
import { getPlaceholderVariation } from '../../utils';
import { Placeholder } from '@/components';
import { Iterate, useConst, withDisplayName } from '@lesnoypudge/utils-react';
import { decorate } from '@lesnoypudge/macro';



const styles = createStyles({
    wrapper: 'flex',
    firstCol: 'w-[72px] shrink-0 px-2',
    avatar: 'mx-auto size-10 rounded-full',
    username: 'h-4 w-full rounded-md',
    line: 'flex h-4 flex-wrap gap-2 overflow-hidden',
    word: 'h-4 w-full rounded-md',
    attachment: 'rounded-md',
    content: 'flex w-full flex-col gap-2',
    timestamp: 'h-4 rounded-md',
});

export namespace MessagePlaceholder {
    export type Props = (
        RT.PropsWithClassName
        & Pick<ClientEntities.User.Settings, 'messageDisplayMode'>
        & {
            placeholderVariation?: getPlaceholderVariation.Variation;
        }
    );
}

decorate(withDisplayName, 'MessagePlaceholder', decorate.target);
decorate(memo, decorate.target);

export const MessagePlaceholder: FC<MessagePlaceholder.Props> = ({
    className = '',
    messageDisplayMode,
    placeholderVariation = getPlaceholderVariation(),
}) => {
    const variation = useConst(() => placeholderVariation);

    const isCozy = messageDisplayMode === 'cozy';
    const isCompact = messageDisplayMode === 'compact';

    return (
        <div className={cn(styles.wrapper, className)}>
            <div className={styles.firstCol}>
                <If condition={isCozy}>
                    <Placeholder.Node className={styles.avatar}/>
                </If>

                <If condition={isCompact}>
                    <Placeholder.Node className={styles.timestamp}/>
                </If>
            </div>


            <div className={styles.content}>
                <If condition={isCozy}>
                    <Placeholder.Node
                        className={styles.username}
                        style={{
                            maxWidth: variation.username,
                        }}
                    />
                </If>

                <Iterate items={variation.lines} getKey={(_, i) => i}>
                    {(words, lineIndex) => (
                        <div className={styles.line}>
                            <Iterate items={words} getKey={(_, i) => i}>
                                {(wordWidth, wordIndex) => (
                                    <>
                                        <If condition={(
                                            isCompact
                                            && lineIndex === 0
                                            && wordIndex === 0
                                        )}>
                                            <Placeholder.Node
                                                className={styles.username}
                                                style={{
                                                    maxWidth: variation.username,
                                                }}
                                            />
                                        </If>

                                        <Placeholder.Node
                                            className={styles.word}
                                            style={{
                                                maxWidth: wordWidth,
                                            }}
                                        />
                                    </>
                                )}
                            </Iterate>
                        </div>
                    )}
                </Iterate>

                <If condition={variation.withAttachment}>
                    <Placeholder.Node
                        className={styles.attachment}
                        style={{
                            maxWidth: variation.attachmentW ?? 0,
                            height: variation.attachmentH ?? 0,
                        }}
                    />
                </If>
            </div>
        </div>
    );
};