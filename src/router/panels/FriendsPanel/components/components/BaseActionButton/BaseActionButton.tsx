import { FC, memo } from 'react';
import { Button, KeyboardNavigation, Overlay, Sprite } from '@/components';
import { useRefManager, withDisplayName } from '@lesnoypudge/utils-react';
import { decorate } from '@lesnoypudge/macro';



const styles = {
    button: `
        size-9 
        p-2 
        rounded-full 
        bg-primary-300 
        fill-icon-300
        hover-focus-visible:fill-icon-100
    `,
    buttonDanger: `
        hover-focus-visible:fill-danger
    `,
    icon: 'size-full',
};

export namespace BaseActionButton {
    export type Props = {
        userId: string;
        label: string;
        onClick: VoidFunction;
        sprite: Sprite.Props['sprite'];
        tooltip: string;
        isLoading: boolean;
    };
}

decorate(withDisplayName, 'BaseActionButton', decorate.target);
decorate(memo, decorate.target);

export const BaseActionButton: FC<BaseActionButton.Props> = ({
    userId,
    label,
    sprite,
    tooltip,
    isLoading,
    onClick,
}) => {
    const buttonRef = useRefManager<HTMLButtonElement>(null);
    const tabIndex = KeyboardNavigation.useTabIndex(userId);
    const setId = KeyboardNavigation.useSetId(userId);

    return (
        <>
            <Button
                className={styles.button}
                label={label}
                tabIndex={tabIndex}
                isLoading={isLoading}
                innerRef={buttonRef}
                onLeftClick={onClick}
                onAnyClick={setId}
            >
                <Sprite
                    className={styles.icon}
                    sprite={sprite}
                />
            </Button>

            <Overlay.Tooltip
                preferredAlignment='top'
                leaderElementRef={buttonRef}
            >
                {tooltip}
            </Overlay.Tooltip>
        </>
    );
};