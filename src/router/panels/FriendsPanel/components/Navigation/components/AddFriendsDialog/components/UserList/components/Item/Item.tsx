import { Avatar, Button } from '@/components';
import { Store } from '@/features';
import { useTrans } from '@/hooks';
import { createStyles } from '@/utils';
import { FC } from 'react';



const styles = createStyles({
    item: 'flex items-center justify-between gap-2 px-2 py-1',
    userInfo: 'flex gap-2',
    avatar: 'size-8',
    name: 'font-semibold',
    addButton: `
        size-8 
        rounded-full 
        bg-primary-300 
        fill-icon-300 
        p-1.5
        hover-focus-visible:bg-primary-400 
        hover-focus-visible:fill-icon-100 
    `,
    addButtonIcon: 'size-full',
});

type Props = {
    id: string;
};

export const Item: FC<Props> = ({
    id,
}) => {
    const { t } = useTrans();

    const name = Store.useSelector(
        Store.Users.Selectors.selectNameById(id),
    );

    const avatar = Store.useSelector(
        Store.Users.Selectors.selectAvatarById(id),
    );

    const defaultAvatar = Store.useSelector(
        Store.Users.Selectors.selectDefaultAvatarById(id),
    );

    const [
        sendRequestTrigger,
        sendRequestHelpers,
    ] = Store.Users.Api.useUserSendFriendRequestMutation();

    const handleAddFriend = () => {
        void sendRequestTrigger({ targetId: id });
    };

    return (
        <li className={styles.item}>
            <div className={styles.userInfo}>
                <Avatar.User
                    className={styles.avatar}
                    avatar={avatar}
                    defaultAvatar={defaultAvatar}
                />

                <span className={styles.name}>
                    {name}
                </span>
            </div>

            <Button
                size='small'
                stylingPreset='brand'
                isLoading={sendRequestHelpers.isLoading}
                onLeftClick={handleAddFriend}
            >
                {t('AddFriendsDialog.item.addButton.text')}
            </Button>
        </li>
    );
};