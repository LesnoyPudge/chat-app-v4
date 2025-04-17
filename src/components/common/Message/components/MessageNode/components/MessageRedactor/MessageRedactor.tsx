import { cn, createStyles } from '@/utils';
import { useIsMessageRedactorActive, useMessageContext, useMessageRedactorContext } from '../../../../hooks';
import { FC } from 'react';
import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { Button, Form, MessageEditor } from '@/components';
import { useTrans } from '@/hooks';
import { WHITESPACE } from '@/vars';



const styles = createStyles({
    controlWrapper: 'mt-1 text-xs text-color-primary',
    controlButton: 'inline',
    form: 'px-2',
});

export const MessageRedactor: FC<RT.PropsWithClassName> = ({
    className = '',
}) => {
    const { t } = useTrans();
    const { message } = useMessageContext();
    const { closeRedactor } = useMessageRedactorContext();
    const isRedactorActive = useIsMessageRedactorActive(message.id);

    if (!isRedactorActive) return null;

    return (
        <Form.Node className={cn(styles.form, className)}>
            <MessageEditor.Wrapper>
                <MessageEditor.Scroll>
                    <MessageEditor.ControlsWrapper>
                        <MessageEditor.Editable/>

                        <MessageEditor.EmojiPickerButton/>
                    </MessageEditor.ControlsWrapper>
                </MessageEditor.Scroll>
            </MessageEditor.Wrapper>

            <div className={styles.controlWrapper}>
                {t('Message.Redactor.controls.esc')}

                {WHITESPACE}

                <Button
                    className={styles.controlButton}
                    stylingPreset='link'
                    label={t('Message.Redactor.controls.cancelButton.label')}
                    onLeftClick={closeRedactor}
                >
                    {t('Message.Redactor.controls.cancel')}
                </Button>

                {WHITESPACE}

                {t('Message.Redactor.controls.enter')}

                {WHITESPACE}

                <Form.SubmitButton
                    className={styles.controlButton}
                    stylingPreset='link'
                    label={t('Message.Redactor.controls.saveButton.label')}
                >
                    {t('Message.Redactor.controls.save')}
                </Form.SubmitButton>
            </div>
        </Form.Node>
    );
};