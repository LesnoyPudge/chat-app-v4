import { PropsWithInnerRef } from '@/types';
import { cn, createStyles } from '@/utils';
import { Iterate } from '@lesnoypudge/utils-react';
import { FC } from 'react';
import { Message } from '@/components';
import { Store } from '@/features';



const styles = createStyles({
    list: {
        base: 'flex flex-col gap-2',
        static: 'h-full overflow-hidden',
    },
});

const variations = Array.from({ length: 20 }, () => {
    return Message.getPlaceholderVariation();
});

export const FeedPlaceholder: FC<PropsWithInnerRef<'div'>> = ({
    innerRef,
}) => {
    const { messageDisplayMode } = Store.useSelector(
        Store.Users.Selectors.selectCurrentUserSettings,
    );

    const isStatic = !innerRef;

    return (
        <div
            className={cn(
                styles.list.base,
                isStatic && styles.list.static,
            )}
            ref={innerRef}
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