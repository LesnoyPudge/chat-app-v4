import { FC } from 'react';
import { styles } from '../../vars';
import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { cn } from '@/utils';
import { Scrollable } from '@/components';



export namespace ActionMenuWrapper {
    export type Props = (
        RT.PropsWithChildrenAndClassName
        & {
            scrollableClassName?: string;
        }
    );
}

export const ActionMenuWrapper: FC<ActionMenuWrapper.Props> = ({
    className = '',
    scrollableClassName = '',
    children,
}) => {
    return (
        <div className={cn(styles.wrapper, className)}>
            <Scrollable
                className={cn(styles.scrollable, scrollableClassName)}
                size='small'
                direction='vertical'
            >
                {children}
            </Scrollable>
        </div>
    );
};