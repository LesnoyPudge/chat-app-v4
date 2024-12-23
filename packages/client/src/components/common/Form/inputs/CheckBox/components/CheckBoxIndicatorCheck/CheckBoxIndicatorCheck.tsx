import { cn, createStyles } from '@utils';
import { FC } from 'react';
import { Sprite } from '@components';
import { RT } from '@lesnoypudge/types-utils-react/namespace';



const styles = createStyles({
    checkBox: {
        base: 'h-5 w-5 rounded border-2 border-brand',
        active: 'bg-brand',
    },
    checkBoxIcon: {
        base: 'h-full w-full fill-white',
        active: 'hidden',
    },
});

export namespace CheckBoxIndicatorCheck {
    export type Props = (
        RT.PropsWithClassName
        & {
            checked: boolean;
        }
    );
}

export const CheckBoxIndicatorCheck: FC<CheckBoxIndicatorCheck.Props> = ({
    className = '',
    checked,
}) => {
    return (
        <>
            <div className={cn(
                styles.checkBox.base,
                { [styles.checkBox.active]: checked },
                className,
            )}
            >
                <Sprite
                    className={cn(
                        styles.checkBoxIcon.base,
                        { [styles.checkBoxIcon.active]: !checked },
                    )}
                    name='CHECK_ICON'
                />
            </div>
        </>
    );
};