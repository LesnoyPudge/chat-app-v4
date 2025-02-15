import { Button, Dialog, Overlay, PresenceStatus, RelativelyPositioned } from '@components';
import { useTrans } from '@i18n';
import { T } from '@lesnoypudge/types-utils-base/namespace';
import { noop } from '@lesnoypudge/utils';
import { useConst, ContextSelectable, useFunction, useMountedWrapper, useThrottle, withDisplayName, createWithDecorator, Iterate } from '@lesnoypudge/utils-react';
import { copyToClipboard } from '@lesnoypudge/utils-web';
import { Features } from '@redux/features';
import { useStoreSelector } from '@redux/hooks';
import { ClientEntities } from '@types';
import { cn, createStyles, getAnimationVariants, getStatusLabel } from '@utils';



type TMPNames = Record<ClientEntities.User.Base['extraStatus'], null>;

const extraStatusNames = Object.keys<TMPNames>({
    default: null,
    invisible: null,
    afk: null,
    dnd: null,
} satisfies TMPNames);

type ExtraStatusNames = T.ArrayValues<typeof extraStatusNames>;

const styles = createStyles({
    wrapper: `
        pointer-events-auto 
        flex 
        min-w-[min(200px,100dvw)] 
        flex-col 
        gap-1 
        rounded-sm 
        bg-primary-600 
        p-2.5 
        shadow-elevation-high
    `,
    button: `
        group/button
        flex
        w-full
        items-center justify-start 
        gap-3 
    `,
    status: `
        size-3.5
        group-hover/button:fill-white
        group-focus-visible/button:fill-white
        group-data-[loading=true]/button:fill-white
    `,
    copyButton: `
        justify-center 
        data-[active=true]:bg-positive 
        data-[active=true]:text-white
    `,
});

const { animationVariants } = getAnimationVariants.withOpacity();

export namespace UserMenu {
    export type DecoratorProps = (
        Overlay.Types.WithControls
        & Pick<
            RelativelyPositioned.Node.RequiredProps,
            'leaderElementOrRectRef'
        >
    );
}

const { withDecorator } = createWithDecorator<UserMenu.DecoratorProps>(({
    controls,
    leaderElementOrRectRef,
    children,
}) => {
    const { t } = useTrans();

    return (
        <Dialog.Provider
            label={t('UserMenu.label')}
            animationVariants={animationVariants}
            focused
            outerState={controls.isOpen}
            onChange={controls.onChange}
        >
            <Dialog.Wrapper>
                <RelativelyPositioned.Node
                    leaderElementOrRectRef={leaderElementOrRectRef}
                    preferredAlignment='top'
                    boundsSize={20}
                    spacing={10}
                    centered
                >
                    {children}
                </RelativelyPositioned.Node>
            </Dialog.Wrapper>
        </Dialog.Provider>
    );
});

export const UserMenu = withDisplayName('UserMenu', withDecorator(() => {
    const {
        name,
        extraStatus,
    } = useStoreSelector(Features.Users.StoreSelectors.selectMe());
    const { throttle, isThrottling } = useThrottle();
    const { closeOverlay } = ContextSelectable.useProxy(Dialog.Context);
    const { mounted } = useMountedWrapper();
    const { t } = useTrans();

    const [
        updateTrigger,
        updateHelpers,
    ] = Features.Users.Api.useProfileUpdateMutation();

    const getSetStatus = (
        newStatus: ExtraStatusNames,
    ) => {
        return () => {
            if (updateHelpers.isLoading) return;

            void updateTrigger({
                extraStatus: newStatus,
            }).then(({ error }) => {
                if (error) return;
                mounted(closeOverlay);
            });
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
        <div className={styles.wrapper} role='menu'>
            <Iterate items={extraStatusNames}>
                {(extraStatusItem) => {
                    const label = getStatusLabel({
                        status: 'online',
                        extraStatus: extraStatusItem,
                    });

                    const isCurrentStatus = extraStatus === extraStatusItem;

                    return (
                        <Button
                            className={styles.button}
                            stylingPreset='invisibleBrand'
                            size='small'
                            label={label}
                            isDisabled={isCurrentStatus}
                            isLoading={updateHelpers.isLoading}
                            onLeftClick={statusToFn[extraStatusItem]}
                            role='menuitem'
                            key={extraStatusItem}
                        >
                            <PresenceStatus
                                className={styles.status}
                                precalculatedStatus={extraStatusItem}
                            />

                            <span>{label}</span>
                        </Button>
                    );
                }}
            </Iterate>

            <Button
                className={cn(styles.button, styles.copyButton)}
                stylingPreset='invisibleBrand'
                size='small'
                onLeftClick={copyName}
                role='menuitem'
                isActive={isThrottling}
            >
                {copyNameText}
            </Button>
        </div>
    );
}));