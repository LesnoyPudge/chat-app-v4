import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { memo, useState } from 'react';
import { Placeholder } from '@/components';
import { cn, createStyles } from '@/utils';
import { isDev, isProd } from '@/vars';
import { renderFunction, useTimeout, withDisplayName } from '@lesnoypudge/utils-react';
import { decorate } from '@lesnoypudge/macro';



const styles = createStyles({
    placeholder: 'flex-1',
});

export namespace WithPlaceholder {
    export type Props<_Value> = (
        RT.PropsWithClassName
        & Placeholder.Node.Props
        & RT.PropsWithRenderFunctionOrNode<[value: NonNullable<_Value>]>
        & {
            reveal: _Value;
        }
    );
}

decorate(withDisplayName, 'WithPlaceholder', decorate.target);
decorate(memo, decorate.target);

export const WithPlaceholder = <_Value,>({
    className = '',
    reveal,
    children,
    containerClassName,
    ...rest
}: WithPlaceholder.Props<_Value>) => {
    let devReveal = isProd;

    if (isDev) {
        // eslint-disable-next-line react-compiler/react-compiler, react-hooks/rules-of-hooks
        const [state, setState] = useState(false);

        // eslint-disable-next-line react-compiler/react-compiler, react-hooks/rules-of-hooks
        useTimeout(() => {
            setState(true);
        }, 5_000);

        devReveal = state;
    }

    const showChildren = devReveal && !!reveal;
    const showPlaceholder = !showChildren;

    return (
        <>
            <If condition={showChildren}>
                {renderFunction(children, reveal!)}
            </If>

            <If condition={showPlaceholder}>
                <Placeholder.Node
                    className={className}
                    containerClassName={cn(
                        styles.placeholder,
                        containerClassName,
                    )}
                    {...rest}
                />
            </If>
        </>
    );
};