import { cn, createStyles } from '@utils';
import { FC } from 'react';
import { Sprite } from '@components';
import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { ASSETS } from '@generated/ASSETS';



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
                checked && styles.checkBox.active,
                className,
            )}
            >
                <Sprite
                    className={cn(
                        styles.checkBoxIcon.base,
                        !checked && styles.checkBoxIcon.active,
                    )}
                    sprite={ASSETS.IMAGES.SPRITE.CHECK_ICON}
                />
            </div>
        </>
    );
};