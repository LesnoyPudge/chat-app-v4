import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { useContextSelector } from '@lesnoypudge/utils-react';
import { cn, createStyles } from '@utils';
import { FC } from 'react';
import { TextInputContext } from '../../context';



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
    export type Props = RT.PropsWithChildrenAndClassName;
}

export const Label: FC<Label.Props> = ({
    className = '',
    children,
}) => {
    const { name } = useContextSelector(TextInputContext, (v) => v.field);

    return (
        <label
            className={cn(styles.label, className)}
            htmlFor={name}
        >
            {children}
        </label>
    );
};