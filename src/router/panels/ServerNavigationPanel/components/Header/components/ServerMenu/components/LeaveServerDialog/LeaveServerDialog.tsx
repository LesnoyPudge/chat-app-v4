import { Button, DialogBlocks } from '@/components';
import { useTrans } from '@/hooks';
import { createWithDecorator, useFunction } from '@lesnoypudge/utils-react';
import { Store } from '@/features';
import { invariant } from '@lesnoypudge/utils';
import { Trans } from 'react-i18next';
import { If } from '@lesnoypudge/react-if';
import { createStyles } from '@/utils';



const styles = createStyles({
    title: 'text-start text-20-24',
});

const { withDecorator } = createWithDecorator<
    DialogBlocks.Types.PublicProps
>(({ children, controls }) => {
    const { t } = useTrans();

    return (
        <DialogBlocks.Base.Provider
            label={t('LeaveServerDialog.label')}
            controls={controls}
        >
            <DialogBlocks.Base.Wrapper>
                {children}
            </DialogBlocks.Base.Wrapper>
        </DialogBlocks.Base.Provider>
    );
});

type Props = {
    serverId: string;
};

export const LeaveServerDialog = withDecorator<Props>(({
    serverId,
}) => {
    const { t } = useTrans();
    const { closeOverlay } = DialogBlocks.useContextProxy();

    const serverName = Store.useSelector(
        Store.Servers.Selectors.selectNameById(serverId),
    );
    // invariant(serverName);

    const userId = Store.useSelector(
        Store.Users.Selectors.selectCurrentUserId,
    );

    const ownerId = Store.useSelector(
        Store.Servers.Selectors.selectOwnerById(serverId),
    );
    // invariant(ownerId);

    const [
        leaveTrigger,
        leaveHelpers,
    ] = Store.Servers.Api.useServerLeaveMutation();

    const handleLeave = useFunction(() => {
        void leaveTrigger({
            serverId,
        }).unwrap().then(closeOverlay);
    });

    const isOwner = userId === ownerId;

    return (
        <DialogBlocks.Base.Inner>
            <DialogBlocks.Base.Header>
                <DialogBlocks.Base.Title className={styles.title}>
                    {t('LeaveServerDialog.title', { serverName })}
                </DialogBlocks.Base.Title>
            </DialogBlocks.Base.Header>

            <DialogBlocks.Base.Content>
                <p>
                    <If condition={isOwner}>
                        <Trans
                            i18nKey='LeaveServerDialog.ownerWarning'
                            values={{ serverName }}
                            components={{
                                strong: <strong/>,
                                br: <br/>,
                            }}
                        />
                    </If>

                    <If condition={!isOwner}>
                        <Trans
                            i18nKey='LeaveServerDialog.memberWarning'
                            values={{ serverName }}
                            components={{
                                strong: <strong/>,
                                br: <br/>,
                            }}
                        />
                    </If>
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
                    isLoading={leaveHelpers.isLoading}
                    onLeftClick={handleLeave}
                >
                    {t('LeaveServerDialog.leaveButton')}
                </Button>
            </DialogBlocks.Base.Footer>
        </DialogBlocks.Base.Inner>
    );
});