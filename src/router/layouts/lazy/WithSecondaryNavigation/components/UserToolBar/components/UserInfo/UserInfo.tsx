import { Avatar, Button, Overlay } from '@/components';
import { FC } from 'react';
import { UserMenu } from './components';
import { createStyles } from '@/utils';
import { useRefManager } from '@lesnoypudge/utils-react';
import { useTrans } from '@/hooks';
import { Store } from '@/features';



const styles = createStyles({
    userInfo: `
        flex 
        w-full 
        items-center 
        rounded-md 
        px-1 
        py-0.5 
        hover-focus-visible:bg-primary-hover
    `,
    avatar: 'h-8 w-8',
    username: `
        ml-2 
        truncate 
        text-sm 
        font-semibold 
        text-color-primary
    `,
});

export const UserInfo: FC = () => {
    const {
        avatar,
        defaultAvatar,
        name,
        status,
        extraStatus,
    } = Store.useSelector(Store.Users.Selectors.selectCurrentUser);
    const controls = Overlay.useControls();
    const buttonRef = useRefManager<HTMLButtonElement>(null);
    const { t } = useTrans();

    return (
        <>
            <Button
                className={styles.userInfo}
                innerRef={buttonRef}
                hasPopup='menu'
                label={t('UserInfo.openMenuButton.label')}
                isActive={controls.isOpen}
                onLeftClick={controls.open}
            >
                <Avatar.WithBadge.Status
                    className={styles.avatar}
                    status={status}
                    extraStatus={extraStatus}
                >
                    <Avatar.User
                        avatar={avatar}
                        defaultAvatar={defaultAvatar}
                    />
                </Avatar.WithBadge.Status>

                <div className={styles.username}>
                    {name}
                </div>
            </Button>

            <UserMenu
                controls={controls}
                leaderElementOrRectRef={buttonRef}
            />
        </>
    );
};