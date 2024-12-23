import { Button, Sprite } from '@components';
import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { useContextProxy } from '@lesnoypudge/utils-react';
import { cn, createStyles } from '@utils';
import { FC } from 'react';
import { Modal } from '@entities';
import { useTrans } from '@i18n';



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

export const BaseModalHeader: FC<RT.PropsWithChildrenAndClassName> = ({
    className = '',
    children,
}) => {
    const { closeOverlay } = useContextProxy(Modal.Context);
    const { t } = useTrans();

    return (
        <div className={cn(styles.wrapper, className)}>
            {children}

            <Button
                className={styles.button}
                onLeftClick={closeOverlay}
                label={t('Modal.closeButton.text')}
            >
                <Sprite
                    className={styles.icon}
                    name='CROSS_ICON'
                />
            </Button>
        </div>
    );
};