import { FC } from 'react';
import { useFullScreenDialogBlocksContextProxy } from '../../context';
import { Button, Form, Sprite } from '@/components';
import { ASSETS } from '@/generated/ASSETS';
import { If } from '@lesnoypudge/react-if';
import { useFunction } from '@lesnoypudge/utils-react';
import { createStyles } from '@/utils';
import { useTrans } from '@/hooks';
import {
    FullScreenDialogBlocksCloseButton,
} from '../FullScreenDialogBlocksCloseButton';



const styles = createStyles({
    mobileControlsWrapper: 'flex pb-4',
    dialogCloseButton: 'ml-auto',
    burgerButton: 'size-9 stroke-white-black',
});


type Props = {
    forceMenuButton?: boolean;
};

export const FullScreenDialogBlocksMobileControls: FC<Props> = ({
    forceMenuButton = false,
}) => {
    const { t } = useTrans();
    const isDirty = Form.useFormStore((v) => v.isDirty);
    const {
        isMenuOpen,
        isMobile,
        openMenu,
        triggerScreenShake,
    } = useFullScreenDialogBlocksContextProxy();

    const handleClick = useFunction(() => {
        if (isDirty) return triggerScreenShake();

        openMenu();
    });

    const shouldShowMenuButton = !isMenuOpen || forceMenuButton;

    if (!isMobile) return;

    return (
        <div className={styles.mobileControlsWrapper}>
            <If condition={shouldShowMenuButton}>
                <Button
                    className={styles.burgerButton}
                    label={t('COMMON.OpenMenu')}
                    onLeftClick={handleClick}
                >
                    <Sprite sprite={ASSETS.IMAGES.SPRITE.BURGER_BARS}/>
                </Button>
            </If>

            <FullScreenDialogBlocksCloseButton
                className={styles.dialogCloseButton}
            />
        </div>
    );
};