import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { cn, createStyles } from '@utils';
import { FC } from 'react';



const styles = createStyles({
    wrapper: `
        flex 
        h-6 
        w-6 
        shrink-0 
        rounded-full 
        border-2 
        border-current 
        p-1
    `,
    inner: {
        base: `
            m-auto 
            h-full 
            w-full 
            scale-0 
            rounded-full 
            bg-current 
            transition-all
        `,
        active: 'scale-100',
    },
});

export namespace RadioInputIndicator {
    export type Props = (
        RT.PropsWithClassName
        & {
            checked: boolean;
        }
    );
}

export const RadioInputIndicator: FC<RadioInputIndicator.Props> = ({
    className = '',
    checked,
}) => {
    return (
        <div className={cn(styles.wrapper, className)}>
            <div
                className={cn(
                    styles.inner.base,
                    checked && styles.inner.active,
                )}
            >
            </div>
        </div>
    );
};