import { Button, Sprite } from '@/components';
import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { cn, createStyles } from '@/utils';
import { FC } from 'react';
import { useTrans } from '@/hooks';
import { ASSETS } from '@/generated/ASSETS';
import { useTextInputContext } from '../../hooks';
import { useFunction } from '@lesnoypudge/utils-react';



const styles = createStyles({
    button: ` 
        size-10 
        rounded 
        fill-icon-300 
        p-2 
        hover-focus-visible:fill-icon-100 
    `,
    icon: 'size-full',
});

export const PasswordToggleButton: FC<RT.PropsWithClassName> = ({
    className = '',
}) => {
    const { t } = useTrans();
    const { type, setType, initialType } = useTextInputContext();

    const isPassword = type === 'password';

    const togglePasswordType = useFunction(() => {
        if (initialType !== 'password') return;

        setType(isPassword ? 'text' : 'password');
    });

    const label = (
        isPassword
            ? t('TextInputPasswordToggle.showText')
            : t('TextInputPasswordToggle.hideText')
    );

    const sprite = (
        isPassword
            ? ASSETS.IMAGES.SPRITE.PASSWORD_EYE_ON
            : ASSETS.IMAGES.SPRITE.PASSWORD_EYE_OFF
    );

    const isActive = isPassword && type === initialType;

    return (
        <Button
            className={cn(styles.button, className)}
            isActive={isActive}
            label={label}
            onLeftClick={togglePasswordType}
        >
            <Sprite
                className={styles.icon}
                sprite={sprite}
            />
        </Button>
    );
};