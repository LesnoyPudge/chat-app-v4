import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { FC, useState } from 'react';
import { Placeholder } from '@/components';
import { cn, createStyles } from '@/utils';
import { isDev, isProd } from '@/vars';
import { useTimeout } from '@lesnoypudge/utils-react';



const styles = createStyles({
    placeholder: 'flex-1',
});

export namespace WithPlaceholder {
    export type Props = (
        RT.PropsWithChildrenAndClassName
        & Placeholder.Node.Props
        & {
            reveal: boolean;
        }
    );
}

export const WithPlaceholder: FC<WithPlaceholder.Props> = ({
    className = '',
    reveal,
    children,
    containerClassName,
    ...rest
}) => {
    let devReveal = isProd;

    if (isDev) {
        // eslint-disable-next-line react-compiler/react-compiler, react-hooks/rules-of-hooks
        const [state, setState] = useState(false);

        // eslint-disable-next-line react-compiler/react-compiler, react-hooks/rules-of-hooks
        useTimeout(() => {
            setState(true);
        }, 10_000);

        devReveal = state;
    }

    return (
        <>
            <If condition={devReveal && reveal}>
                {children}
            </If>

            <If condition={!devReveal || !reveal}>
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