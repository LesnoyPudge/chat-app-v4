import { ActionMenu, Button, Overlay, PresenceStatus } from '@/components';
import { useTrans } from '@/hooks';
import { noop } from '@lesnoypudge/utils';
import {
    useConst,
    useFunction,
    useThrottle,
    withDisplayName,
    createWithDecorator,
    Iterate,
} from '@lesnoypudge/utils-react';
import { copyToClipboard } from '@lesnoypudge/utils-web';
import { ClientEntities } from '@/types';
import { cn, createStyles, getStatusLabel } from '@/utils';
import { Store } from '@/features';
import { decorate } from '@lesnoypudge/macro';
import { useMotionValue } from 'motion/react';
import { AnimationPresets } from '@/entities';



type ExtraStatusNames = ClientEntities.User.ExtraStatus;

const extraStatusNames: ExtraStatusNames[] = [
    'afk', 'default', 'dnd', 'invisible',
];

const styles = createStyles({
    button: 'justify-start',
    status: `
        size-3.5
        group-data-[loading=true]/button:fill-white
    `,
    copyButton: `
        justify-center 
        data-[active=true]:bg-positive 
        data-[active=true]:text-white
    `,
});

const { withDecorator } = createWithDecorator<
    Overlay.Menu.Types.PublicProps
>(({
    controls,
    leaderElementOrRectRef,
    children,
}) => {
    const { t } = useTrans();
    const progress = useMotionValue(2);
    const { onEnter, onExit, style } = AnimationPresets.useFade({
        progress,
    });

    return (
        <Overlay.Menu.Provider
            label={t('UserMenu.label')}
            progress={progress}
            onEnter={onEnter}
            onExit={onExit}
            style={style}
            controls={controls}
            leaderElementOrRectRef={leaderElementOrRectRef}
            preferredAlignment='top'
            spacing={10}
            centered
        >
            <Overlay.Menu.Wrapper>
                {children}
            </Overlay.Menu.Wrapper>
        </Overlay.Menu.Provider>
    );
});

decorate(withDisplayName, 'UserMenu', decorate.target);

export const UserMenu = withDecorator(() => {
    const {
        name,
        extraStatus,
    } = Store.useSelector(Store.Users.Selectors.selectCurrentUser);
    const { throttle, isThrottling } = useThrottle();
    const { t } = useTrans();

    const [
        updateTrigger,
        updateHelpers,
    ] = Store.Users.Api.useUserProfileUpdateMutation();

    const getSetStatus = (newStatus: ExtraStatusNames) => {
        return () => {
            if (updateHelpers.isLoading) return;

            void updateTrigger({ extraStatus: newStatus });
        };
    };

    const statusToFn = useConst(() => ({
        afk: getSetStatus('afk'),
        default: getSetStatus('default'),
        dnd: getSetStatus('dnd'),
        invisible: getSetStatus('invisible'),
    } satisfies Record<ExtraStatusNames, VoidFunction>));

    const copyName = useFunction(() => {
        copyToClipboard(name);
        throttle(noop, 2_000)();
    });

    const copyNameText = (
        isThrottling
            ? t('UserMenu.copyNameButton.text.copied')
            : t('UserMenu.copyNameButton.text.copy')
    );

    return (
        <ActionMenu.Wrapper>
            <Iterate items={extraStatusNames} getKey={(v) => v}>
                {(extraStatusItem) => {
                    const label = getStatusLabel({
                        status: 'online',
                        extraStatus: extraStatusItem,
                    });

                    const isCurrentStatus = extraStatus === extraStatusItem;

                    return (
                        <Button
                            className={cn(
                                ActionMenu.styles.button,
                                styles.button,
                            )}
                            {...ActionMenu.buttonProps}
                            label={label}
                            isDisabled={isCurrentStatus}
                            isLoading={updateHelpers.isLoading}
                            onLeftClick={statusToFn[extraStatusItem]}
                        >
                            <PresenceStatus
                                className={cn(
                                    ActionMenu.styles.icon.fill,
                                    styles.status,
                                )}
                                status='online'
                                extraStatus={extraStatusItem}
                            />

                            <span>{label}</span>
                        </Button>
                    );
                }}
            </Iterate>

            <Button
                className={cn(
                    ActionMenu.styles.button,
                    styles.copyButton,
                )}
                {...ActionMenu.buttonProps}
                onLeftClick={copyName}
                isActive={isThrottling}
            >
                {copyNameText}
            </Button>
        </ActionMenu.Wrapper>
    );
});