import { Button, DialogBlocks } from '@/components';
import { createWithDecorator, useFunction } from '@lesnoypudge/utils-react';
import { useTrans } from '@/hooks';
import { Store } from '@/features';
import { createStyles } from '@/utils';



const styles = createStyles({
    title: 'self-start text-20-24',
});

const { withDecorator } = createWithDecorator<
    DialogBlocks.Types.PublicProps
>(({ children, controls }) => {
    const { t } = useTrans();

    return (
        <DialogBlocks.Base.Provider
            label={t('DeleteAccountDialog.label')}
            controls={controls}
        >
            <DialogBlocks.Base.Wrapper>
                {children}
            </DialogBlocks.Base.Wrapper>
        </DialogBlocks.Base.Provider>
    );
});

export const DeleteAccountDialog = withDecorator(() => {
    const { t } = useTrans();
    const { closeOverlay } = DialogBlocks.useContextProxy();

    const [
        deleteAccountTrigger,
        deleteAccountHelpers,
    ] = Store.Users.Api.useUserDeleteAccountMutation();

    const handleDelete = useFunction(() => {
        void deleteAccountTrigger();
    });

    return (
        <DialogBlocks.Base.Wrapper>
            <DialogBlocks.Base.Header>
                <DialogBlocks.Base.Title className={styles.title}>
                    {t('DeleteAccountDialog.title')}
                </DialogBlocks.Base.Title>
            </DialogBlocks.Base.Header>

            <DialogBlocks.Base.Content className='gap-4'>
                <p>
                    {t('DeleteAccountDialog.warning')}
                </p>
            </DialogBlocks.Base.Content>

            <DialogBlocks.Base.Footer>
                <Button
                    stylingPreset='lite'
                    size='medium'
                    onLeftClick={closeOverlay}
                >
                    {t('COMMON.Close')}
                </Button>

                <Button
                    stylingPreset='brandDanger'
                    size='medium'
                    isLoading={deleteAccountHelpers.isLoading}
                    onLeftClick={handleDelete}
                >
                    {t('DeleteAccountDialog.deleteButton.text')}
                </Button>
            </DialogBlocks.Base.Footer>
        </DialogBlocks.Base.Wrapper>
    );
});