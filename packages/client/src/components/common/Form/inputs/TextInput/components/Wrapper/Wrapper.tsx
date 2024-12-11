import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { cn, createStyles } from '@utils';
import { FC } from 'react';



const styles = createStyles({
    wrapper: 'flex h-10 w-full rounded bg-primary-500',
});

export namespace Wrapper {
    export type Props = RT.PropsWithChildrenAndClassName;
}

export const Wrapper: FC<Wrapper.Props> = ({
    className = '',
    children,
}) => {
    return (
        <div className={cn(styles.wrapper, className)}>
            {children}
        </div>
    );
};