import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { memo, useState } from 'react';
import { Placeholder } from '@/components';
import { isDev, isProd } from '@/vars';
import { renderFunction, useTimeout, withDisplayName } from '@lesnoypudge/utils-react';
import { decorate } from '@lesnoypudge/macro';



export namespace WithPlaceholder {
    export type Props<_Value> = (
        Placeholder.Node.Props
        & RT.PropsWithRenderFunctionOrNode<[value: NonNullable<_Value>]>
        & {
            reveal: _Value;
        }
    );
}

decorate(withDisplayName, 'WithPlaceholder', decorate.target);
decorate(memo, decorate.target);

export const WithPlaceholder = <_Value,>({
    reveal,
    children,
    ...rest
}: WithPlaceholder.Props<_Value>) => {
    let devReveal = isProd;

    if (isDev) {
        // eslint-disable-next-line react-compiler/react-compiler, react-hooks/rules-of-hooks
        const [state, setState] = useState(false);

        // eslint-disable-next-line react-compiler/react-compiler, react-hooks/rules-of-hooks
        useTimeout(() => {
            setState(true);
        }, 999_000);

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
                <Placeholder.Node {...rest}/>
            </If>
        </>
    );
};