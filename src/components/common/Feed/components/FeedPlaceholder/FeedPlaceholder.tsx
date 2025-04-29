import { cn, createStyles } from '@/utils';
import { Iterate, withDisplayName } from '@lesnoypudge/utils-react';
import { FC, memo } from 'react';
import { Message } from '@/components';
import { Store } from '@/features';
import { decorate } from '@lesnoypudge/macro';
import { Types } from '../../types';



const styles = createStyles({
    list: {
        base: `
            flex
            grow
            flex-col-reverse
            justify-between
            gap-2
            overflow-hidden
            [overflow-anchor:none]
        `,
        nonStatic: 'max-h-[80%]',
    },
});

const variations = Array.from({ length: 6 }, () => {
    return Message.getPlaceholderVariation();
});

decorate(withDisplayName, 'FeedPlaceholder', decorate.target);
decorate(memo, decorate.target);

export const FeedPlaceholder: FC<Types.FeedPlaceholder.Props> = ({
    isStatic = false,
}) => {
    const { messageDisplayMode } = Store.useSelector(
        Store.Users.Selectors.selectCurrentUserSettings,
    );

    return (
        <div className={cn(
            styles.list.base,
            !isStatic && styles.list.nonStatic,
        )}>
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