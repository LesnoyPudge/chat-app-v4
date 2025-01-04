import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { cn, createStyles } from '@utils';
import { CSSProperties, FC, useMemo } from 'react';



const styles = createStyles({
    wrapper: {
        base: 'shrink-0 bg-primary-100',
        vertical: `
            mx-[var(--spacing)] 
            my-auto 
            h-[var(--length)] 
            w-[var(--thickness)]
        `,
        horizontal: `
            mx-auto 
            my-[var(--spacing)] 
            h-[var(--thickness)]
            w-[var(--length)]
        `,
    },
});

const numToPx = (value: string | number) => {
    return typeof value === 'number' ? `${value}px` : value;
};

export namespace Separator {
    export type Props = (
        RT.PropsWithClassName
        & {
            spacing: number | string;
            thickness: number | string;
            length: number | string;
            orientation?: 'horizontal' | 'vertical';
        }
    );
}

export const Separator: FC<Separator.Props> = ({
    className = '',
    spacing,
    thickness,
    length,
    orientation = 'horizontal',
}) => {
    const style = useMemo(() => ({
        '--spacing': numToPx(spacing),
        '--thickness': numToPx(thickness),
        '--length': numToPx(length),
    } as CSSProperties), [length, spacing, thickness]);

    return (
        <div
            className={cn(
                styles.wrapper.base,
                styles.wrapper[orientation],
                className,
            )}
            style={style}
        >
        </div>
    );
};