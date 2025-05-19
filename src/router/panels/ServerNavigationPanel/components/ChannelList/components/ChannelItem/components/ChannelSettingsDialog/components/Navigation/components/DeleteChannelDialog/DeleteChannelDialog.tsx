import { Button, DialogBlocks } from '@/components';
import { Navigator, Store } from '@/features';
import { useTrans } from '@/hooks';
import { createStyles } from '@/utils';
import { decorate } from '@lesnoypudge/macro';
import { invariant } from '@lesnoypudge/utils';
import {
    createWithDecorator,
    useFunction,
    withDisplayName,
} from '@lesnoypudge/utils-react';
import { Trans } from 'react-i18next';



const styles = createStyles({
    title: 'text-start text-20-24',
});

const { withDecorator } = createWithDecorator<
    DialogBlocks.Types.PublicProps
>(({ children, controls }) => {
    const { t } = useTrans();

    return (
        <DialogBlocks.Base.Provider
            label={t('DeleteChannelDialog.label')}
            controls={controls}
        >
            <DialogBlocks.Base.Wrapper>
                {children}
            </DialogBlocks.Base.Wrapper>
        </DialogBlocks.Base.Provider>
    );
});

type Props = {
    channelId: string;
};

decorate(withDisplayName, 'DeleteChannelDialog', decorate.target);

export const DeleteChannelDialog = withDecorator<Props>(({
    channelId,
}) => {
    const { t } = useTrans();
    const { navigateTo } = Navigator.useNavigateTo();
    const { closeOverlay } = DialogBlocks.useContextProxy();

    const [
        deleteChannelTrigger,
        deleteChannelHelpers,
    ] = Store.Channels.Api.useChannelDeleteMutation();

    const channelName = Store.useSelector(
        Store.Channels.Selectors.selectNameById(channelId),
    );
    invariant(channelName);

    const serverId = Store.useSelector(
        Store.Channels.Selectors.selectServerById(channelId),
    );
    invariant(serverId);

    const handleDeleteChannel = useFunction(() => {
        void deleteChannelTrigger({
            channelId,
        }).unwrap().then(() => {
            navigateTo.server({ serverId });
            closeOverlay();
        });
    });

    return (
        <DialogBlocks.Base.Inner>
            <DialogBlocks.Base.Header>
                <DialogBlocks.Base.Title className={styles.title}>
                    {t('DeleteChannelDialog.title', {
                        channelName,
                    })}
                </DialogBlocks.Base.Title>
            </DialogBlocks.Base.Header>

            <DialogBlocks.Base.Content>
                <p>
                    <Trans
                        i18nKey='DeleteChannelDialog.warning'
                        values={{ channelName }}
                        components={{
                            strong: <strong/>,
                            br: <br/>,
                        }}
                    />
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
                    isLoading={deleteChannelHelpers.isLoading}
                    onLeftClick={handleDeleteChannel}
                >
                    {t('DeleteChannelDialog.deleteButton.text')}
                </Button>
            </DialogBlocks.Base.Footer>
        </DialogBlocks.Base.Inner>
    );
});