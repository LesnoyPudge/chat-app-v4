import { FC, memo } from 'react';
import { useEmojiSwitcher } from './hooks';
import { sharedStyles } from '../../styles';
import { cn, createStyles, getAnimationVariants } from '@/utils';
import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { Button, Emoji, EmojiPicker, Overlay, RelativelyPositioned, RTE } from '@/components';
import { useTrans } from '@/hooks';
import { useFunction, useRefManager, withDisplayName } from '@lesnoypudge/utils-react';
import { decorate } from '@lesnoypudge/macro';



const { animationVariants } = getAnimationVariants.withOpacity();

const styles = createStyles({
    button: 'group/button p-2',
    emoji: {
        base: `
            size-full 
            scale-[0.9] 
            grayscale 
            transition-all
            duration-300
            group-hover-focus-visible/button:scale-[1] 
            group-hover-focus-visible/button:grayscale-0
        `,
        active: 'scale-[1] grayscale-0',
    },
});

decorate(withDisplayName, 'MessageEditorEmojiPickerButton', decorate.target);
decorate(memo, decorate.target);

export const MessageEditorEmojiPickerButton: FC<RT.PropsWithClassName> = ({
    className = '',
}) => {
    const controls = Overlay.useControls();
    const { t } = useTrans();
    const { insert } = RTE.Modules.Emoji.useInsertEmoji();
    const buttonRef = useRefManager<HTMLButtonElement>(null);
    const { changeEmoji, emojiCode } = useEmojiSwitcher();

    const handleMouseEnter = useFunction(() => {
        if (controls.isOpen) return;

        changeEmoji();
    });

    return (
        <>
            <Button
                className={cn(
                    sharedStyles.stickyControl,
                    styles.button,
                    className,
                )}
                label={t('MessageEditor.EmojiPickerButton.label')}
                hasPopup='dialog'
                innerRef={buttonRef}
                isActive={controls.isOpen}
                onMouseEnter={handleMouseEnter}
                onLeftClick={controls.open}
            >
                <Emoji
                    className={cn(
                        styles.emoji.base,
                        controls.isOpen && styles.emoji.active,
                    )}
                    code={emojiCode}
                />
            </Button>

            <Overlay.Dialog.Provider
                controls={controls}
                animationVariants={animationVariants}
                label={t('MessageEditor.EmojiPickerButton.dialog.label')}
            >
                <Overlay.Dialog.Wrapper>
                    <RelativelyPositioned.Node
                        leaderElementOrRectRef={buttonRef}
                        preferredAlignment='top'
                    >
                        <EmojiPicker onEmojiPick={insert}/>
                    </RelativelyPositioned.Node>
                </Overlay.Dialog.Wrapper>
            </Overlay.Dialog.Provider>
        </>
    );
};