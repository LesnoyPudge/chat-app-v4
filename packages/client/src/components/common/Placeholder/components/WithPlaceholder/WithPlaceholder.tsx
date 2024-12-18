import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { FC } from 'react';
import { Placeholder } from '@components';
import { cn, createStyles } from '@utils';



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
    return (
        <>
            <If condition={reveal}>
                {children}
            </If>

            <If condition={!reveal}>
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