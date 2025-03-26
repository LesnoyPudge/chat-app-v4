import { FC } from 'react';
import { styles } from '../../vars';
import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { cn } from '@/utils';
import { Scrollable } from '@/components';



export namespace ActionMenuWrapper {
    export type Props = (
        RT.PropsWithChildrenAndClassName
        & {
            listClassName?: string;
        }
    );
}

export const ActionMenuWrapper: FC<ActionMenuWrapper.Props> = ({
    className = '',
    listClassName = '',
    children,
}) => {
    return (
        <div className={cn(styles.wrapper, className)}>
            <Scrollable
                size='small'
                direction='vertical'
            >
                <div className={cn(styles.list, listClassName)}>
                    {children}
                </div>
            </Scrollable>
        </div>
    );
};