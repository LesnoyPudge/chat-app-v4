import { Button, DialogBlocks } from '@/components';
import { Navigator, Store } from '@/features';
import { useTrans } from '@/hooks';
import { createStyles } from '@/utils';
import { env } from '@/vars';
import { invariant, noop } from '@lesnoypudge/utils';
import {
    createWithDecorator,
    useFunction,
    useThrottle,
} from '@lesnoypudge/utils-react';
import { copyToClipboard } from '@lesnoypudge/utils-web';



const styles = createStyles({
    linkWrapper: `
        flex 
        h-12 
        items-center 
        justify-between 
        gap-2 
        rounded 
        bg-primary-500 
        p-2
    `,
    linkText: 'truncate font-medium text-color-primary',
    copyButton: 'h-full',
});

const { withDecorator } = createWithDecorator<
    DialogBlocks.Types.PublicProps
>(({ children, controls }) => {
    const { t } = useTrans();

    return (
        <DialogBlocks.Base.Provider
            label={t('InviteToServerDialog.label')}
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

export const InviteToServerDialog = withDecorator<Props>(({
    serverId,
}) => {
    const { t } = useTrans();
    const { throttle, isThrottling } = useThrottle();
    const { closeOverlay } = DialogBlocks.useContextProxy();

    const serverName = Store.useSelector(
        Store.Servers.Selectors.selectNameById(serverId),
    );
    invariant(serverName);

    const invitations = Store.useSelector(
        Store.Servers.Selectors.selectInvitationsById(serverId),
    );
    invariant(invitations);

    const invitationCode = invitations[0]?.code;
    invariant(
        invitationCode,
        'we assume that there is always an invitation code',
    );

    const invitationLink = (
        env._PUBLIC_CLIENT_URL
        + Navigator.navigatorPath.invitation({ invitationCode })
    );

    const copyButtonText = (
        isThrottling
            ? t('InviteToServerDialog.copyButton.activeText')
            : t('InviteToServerDialog.copyButton.inactiveText')
    );

    const handleCopyInvitation = useFunction(() => {
        copyToClipboard(invitationLink);
        throttle(noop, 2_000)();
    });

    return (
        <DialogBlocks.Base.Inner>
            <DialogBlocks.Base.Header>
                <DialogBlocks.Base.Title>
                    {t('InviteToServerDialog.title')}
                </DialogBlocks.Base.Title>

                <DialogBlocks.Base.Subtitle>
                    {t('InviteToServerDialog.subtitle')}
                </DialogBlocks.Base.Subtitle>
            </DialogBlocks.Base.Header>

            <DialogBlocks.Base.Content>
                <div className={styles.linkWrapper}>
                    <div className={styles.linkText}>
                        {invitationLink}
                    </div>

                    <Button
                        className={styles.copyButton}
                        stylingPreset='brand'
                        onLeftClick={handleCopyInvitation}
                    >
                        {copyButtonText}
                    </Button>
                </div>
            </DialogBlocks.Base.Content>

            <DialogBlocks.Base.Footer>
                <Button
                    stylingPreset='lite'
                    size='medium'
                    onLeftClick={closeOverlay}
                >
                    {t('COMMON.Close')}
                </Button>
            </DialogBlocks.Base.Footer>
        </DialogBlocks.Base.Inner>
    );
});