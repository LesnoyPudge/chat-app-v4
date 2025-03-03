import { Button, Sprite } from '@/components';
import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { ContextSelectable } from '@lesnoypudge/utils-react';
import { cn, createStyles } from '@/utils';
import { FC } from 'react';
import { TextInputContext } from '../../context';
import { useTrans } from '@/hooks';
import { ASSETS } from '@/generated/ASSETS';



const styles = createStyles({
    button: `
        aspect-square 
        h-10 
        rounded 
        fill-icon-300 
        p-2 
        hover-focus-visible:fill-icon-100 
    `,
    icon: 'h-full w-full',
});

export namespace PasswordToggleButton {
    export type Props = RT.PropsWithClassName;
}

export const PasswordToggleButton: FC<PasswordToggleButton.Props> = ({
    className = '',
}) => {
    const {
        type,
        initialType,
        togglePasswordType,
    } = ContextSelectable.useProxy(TextInputContext);
    const { t } = useTrans();

    const isPassword = type === 'password';
    const isActive = isPassword && type === initialType;

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