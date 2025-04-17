import { Button, EmojiPicker, Overlay, RelativelyPositioned, Sprite } from '@/components';
import { useTrans } from '@/hooks';
import { createStyles, getAnimationVariants } from '@/utils';
import { FC } from 'react';
import { useMessageContext, useMessageRedactorContext } from '../../../../hooks';
import { useFunction, useRefManager } from '@lesnoypudge/utils-react';
import { ASSETS } from '@/generated/ASSETS';
import { Store } from '@/features';



const styles = createStyles({
    buttonsWrapper: `
        pointer-events-none 
        absolute 
        right-0 
        top-0 
        mx-3.5 
        flex 
        translate-y-[-25px] 
        rounded-md 
        bg-primary-300 
        opacity-0 
        shadow-elevation-low 
        group-hover-focus-within/message:pointer-events-auto 
        group-hover-focus-within/message:opacity-100 
    `,
    button: `
        size-8 
        rounded-md 
        fill-icon-200 
        p-1.5 
        hover-focus-visible:bg-primary-hover 
        hover-focus-visible:fill-icon-100
    `,
    buttonIcon: 'size-full',
    tooltip: 'text-sm',
});

const { animationVariants } = getAnimationVariants.withOpacity();


export const MessageControlBar: FC = () => {
    const { t } = useTrans();
    const { tabIndex, message, toggleReaction } = useMessageContext();
    const { openRedactor } = useMessageRedactorContext();
    const addReactionControls = Overlay.useControls();
    const addReactionRef = useRefManager<HTMLButtonElement>(null);
    const openRedactorRef = useRefManager<HTMLButtonElement>(null);

    const handleOpenRedactor = useFunction(() => {
        openRedactor(message.id);
    });

    return (
        <div
            className={styles.buttonsWrapper}
            role='menu'
            aria-label={t('Message.ControlBar.menu.label')}
        >
            <Button
                className={styles.button}
                label={t('Message.ControlBar.addReactionButton.label')}
                role='menuitem'
                hasPopup='dialog'
                isActive={addReactionControls.isOpen}
                tabIndex={tabIndex}
                innerRef={addReactionRef}
                onLeftClick={addReactionControls.open}
            >
                <Sprite
                    className={styles.buttonIcon}
                    sprite={ASSETS.IMAGES.SPRITE.ADD_REACTION_ICON}
                />
            </Button>

            <Overlay.Tooltip
                className={styles.tooltip}
                preferredAlignment='top'
                spacing={5}
                leaderElementRef={addReactionRef}
            >
                {t('Message.ControlBar.addReactionButton.label')}
            </Overlay.Tooltip>

            <Overlay.Dialog.Provider
                controls={addReactionControls}
                animationVariants={animationVariants}
                label={t('Message.ControlBar.reactionPicker.label')}
            >
                <Overlay.Dialog.Wrapper>
                    <RelativelyPositioned.Node
                        leaderElementOrRectRef={addReactionRef}
                        preferredAlignment='top'
                    >
                        <EmojiPicker onEmojiPick={toggleReaction}/>
                    </RelativelyPositioned.Node>
                </Overlay.Dialog.Wrapper>
            </Overlay.Dialog.Provider>

            <Button
                className={styles.button}
                label={t('Message.ControlBar.openRedactorButton.label')}
                role='menuitem'
                tabIndex={tabIndex}
                innerRef={openRedactorRef}
                onLeftClick={handleOpenRedactor}
            >
                <Sprite
                    className={styles.buttonIcon}
                    sprite={ASSETS.IMAGES.SPRITE.PEN_ICON}
                />
            </Button>

            <Overlay.Tooltip
                className={styles.tooltip}
                preferredAlignment='top'
                spacing={5}
                leaderElementRef={openRedactorRef}
            >
                {t('Message.ControlBar.openRedactorButton.label')}
            </Overlay.Tooltip>
        </div>
    );
};