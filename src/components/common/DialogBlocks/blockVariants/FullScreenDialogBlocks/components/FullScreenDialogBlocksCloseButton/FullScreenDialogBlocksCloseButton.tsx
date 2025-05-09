import { cn, createStyles } from '@/utils';
import { Button, DialogBlocks, Sprite } from '@/components';
import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { FC } from 'react';
import { useTrans } from '@/hooks';
import { ASSETS } from '@/generated/ASSETS';
import { If } from '@lesnoypudge/react-if';



const styles = createStyles({
    button: `
        pointer-events-auto 
        flex 
        flex-col 
        items-center 
        gap-1.5 
        border-icon-200 
        fill-icon-200 
        text-color-muted 
        transition-all 
        duration-75 
        hover-focus-visible:border-icon-100 
        hover-focus-visible:fill-icon-100 
        hover-focus-visible:text-color-primary 
    `,
    iconWrapper: 'size-9 rounded-full border-2 p-1.5',
    icon: 'size-full duration-75',
    text: 'text-xs font-semibold transition-all duration-75 mobile:hidden',
});

type Props = (
    RT.PropsWithClassName
    & {
        hint?: string;
    }
);

export const FullScreenDialogBlocksCloseButton: FC<Props> = ({
    className = '',
    hint,
}) => {
    const { t } = useTrans();
    const { closeOverlay } = DialogBlocks.useContextProxy();

    return (
        <Button
            className={cn(styles.button, className)}
            label={t('COMMON.Close')}
            onLeftClick={closeOverlay}
        >
            <div className={styles.iconWrapper}>
                <Sprite
                    className={styles.icon}
                    sprite={ASSETS.IMAGES.SPRITE.CROSS_ICON}
                />
            </div>

            <If condition={hint}>
                <div className={styles.text}>
                    {hint}
                </div>
            </If>
        </Button>
    );
};