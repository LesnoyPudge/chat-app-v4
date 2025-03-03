import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { cn, createStyles } from '@/utils';
import { FC } from 'react';



const styles = createStyles({
    label: `
        mb-2 
        block 
        text-xs 
        font-bold 
        uppercase 
        text-color-secondary
    `,
});

export namespace Label {
    export type Props = (
        RT.PropsWithChildrenAndClassName
        & {
            htmlFor: string;
        }
    );
}

export const Label: FC<Label.Props> = ({
    className = '',
    htmlFor,
    children,
}) => {
    return (
        <label
            className={cn(styles.label, className)}
            htmlFor={htmlFor}
        >
            {children}
        </label>
    );
};