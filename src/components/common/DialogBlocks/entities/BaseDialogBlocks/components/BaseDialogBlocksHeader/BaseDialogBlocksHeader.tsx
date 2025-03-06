import { Button, Sprite, DialogBlocks } from '@/components';
import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { ContextSelectable } from '@lesnoypudge/utils-react';
import { cn, createStyles } from '@/utils';
import { FC } from 'react';
import { useTrans } from '@/hooks';
import { ASSETS } from '@/generated/ASSETS';



const styles = createStyles({
    wrapper: 'relative flex flex-col items-center gap-2 px-4 py-6',
    button: `
        absolute 
        right-0.5 
        top-0.5 
        h-8 
        w-8 
        fill-icon-300 
        p-1 hover-focus-visible:fill-icon-100
    `,
    icon: 'h-full w-full',
});

export const BaseDialogBlocksHeader: FC<RT.PropsWithChildrenAndClassName> = ({
    className = '',
    children,
}) => {
    const { closeOverlay } = ContextSelectable.useProxy(DialogBlocks.Context);
    const { t } = useTrans();

    return (
        <div className={cn(styles.wrapper, className)}>
            {children}

            <Button
                className={styles.button}
                onLeftClick={closeOverlay}
                label={t('Dialog.closeButton.text')}
            >
                <Sprite
                    className={styles.icon}
                    sprite={ASSETS.IMAGES.SPRITE.CROSS_ICON}
                />
            </Button>
        </div>
    );
};