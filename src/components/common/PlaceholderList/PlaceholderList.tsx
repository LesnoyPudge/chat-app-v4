import { cn, createStyles } from '@/utils';
import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { Iterate, withDisplayName } from '@lesnoypudge/utils-react';
import { FC, memo, useMemo } from 'react';
import { Placeholder } from '@/components';
import { decorate } from '@lesnoypudge/macro';



const styles = createStyles({
    wrapper: 'flex size-full flex-col overflow-hidden',
    item: 'w-full',
});

export namespace PlaceholderList {
    export type Props = (
        RT.PropsWithClassName
        & {
            count: number;
            itemSize: number;
            gap: number;
        }
    );
}

decorate(withDisplayName, 'PlaceholderList', decorate.target);
decorate(memo, decorate.target);

export const PlaceholderList: FC<PlaceholderList.Props> = ({
    className = '',
    count,
    gap,
    itemSize,
}) => {
    const placeholderItems = useMemo(() => {
        return Array.from({ length: count }).map((_, i) => i);
    }, [count]);

    return (
        <div
            className={cn(styles.wrapper, className)}
            style={{
                gap,
            }}
        >
            <Iterate items={placeholderItems} getKey={(v) => v}>
                {() => (
                    <Placeholder.Node
                        className={styles.item}
                        style={{
                            minHeight: itemSize,
                        }}
                    />
                )}
            </Iterate>
        </div>
    );
};