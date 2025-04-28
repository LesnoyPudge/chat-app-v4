import { cn, createStyles } from '@/utils';
import { Iterate, withDisplayName } from '@lesnoypudge/utils-react';
import { CSSProperties, FC, memo } from 'react';
import { Message } from '@/components';
import { Store } from '@/features';
import { decorate } from '@lesnoypudge/macro';
import { Types } from '../../types';
import { useFeedContextProxy } from '../../context';



const styles = createStyles({
    list: {
        base: `
            visible 
            flex 
            max-h-[--placeholder-height] 
            min-h-[--placeholder-height] 
            flex-col-reverse
            gap-2
            overflow-hidden
            [overflow-anchor:none]
        `,
        static: `
            max-h-full 
            min-h-full 
        `,
    },
});

const variations = Array.from({ length: 15 }, () => {
    return Message.getPlaceholderVariation();
});


decorate(withDisplayName, 'FeedPlaceholder', decorate.target);
decorate(memo, decorate.target);

export const FeedPlaceholder: FC<Types.FeedPlaceholder.Props> = ({
    isStatic = false,
}) => {
    const { messagePlaceholderHeight } = useFeedContextProxy();

    const { messageDisplayMode } = Store.useSelector(
        Store.Users.Selectors.selectCurrentUserSettings,
    );

    const style = {
        '--placeholder-height': `${messagePlaceholderHeight}px`,
    } as CSSProperties;

    return (
        <div
            className={cn(
                styles.list.base,
                isStatic && styles.list.static,
            )}
            style={style}
        >
            <Iterate
                items={variations}
                getKey={(_, index) => index}
            >
                {(variation) => (
                    <Message.Placeholder
                        messageDisplayMode={messageDisplayMode}
                        placeholderVariation={variation}
                    />
                )}
            </Iterate>
        </div>
    );
};