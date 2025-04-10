import { cn, createStyles } from '@/utils';
import { FC } from 'react';
import { Sprite } from '@/components';
import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { ASSETS } from '@/generated/ASSETS';
import { useCheckBoxContext } from '../../hooks';



const styles = createStyles({
    checkBox: {
        base: 'size-5 rounded border-2 border-brand',
        active: 'bg-brand',
    },
    checkBoxIcon: {
        base: 'size-full fill-white',
        active: 'hidden',
    },
});


export const CheckBoxIndicatorCheck: FC<RT.PropsWithClassName> = ({
    className = '',
}) => {
    const { value } = useCheckBoxContext();

    return (
        <div className={cn(
            styles.checkBox.base,
            value && styles.checkBox.active,
            className,
        )}>
            <Sprite
                className={cn(
                    styles.checkBoxIcon.base,
                    !value && styles.checkBoxIcon.active,
                )}
                sprite={ASSETS.IMAGES.SPRITE.CHECK_ICON}
            />
        </div>
    );
};