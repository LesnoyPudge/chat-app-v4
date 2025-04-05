import { useTrans } from '@/hooks';
import { ASSETS } from '@/generated/ASSETS';
import { Navigator, Store } from '@/features';
import { useFunction, useIsMounted, withDisplayName } from '@lesnoypudge/utils-react';
import { BaseActionButton } from '../BaseActionButton';
import { FC, memo } from 'react';
import { decorate } from '@lesnoypudge/macro';



type Props = Pick<BaseActionButton.Props, 'userId'>;

decorate(withDisplayName, 'FriendsActionButtons', decorate.target);
decorate(memo, decorate.target);

export const FriendsActionButtons: FC<Props> = ({
    userId,
}) => {
    const { t } = useTrans();
    const {
        isConversationLoading,
        tryNavigateToConversation,
    } = Navigator.useTryNavigateToConversation();

    const [
        deleteFriendTrigger,
        deleteFriendHelpers,
    ] = Store.Users.Api.useUserDeleteFriendMutation();

    const handleNavigateToChat = useFunction(() => {
        tryNavigateToConversation(userId);
    });

    const handleDeleteFriend = () => {
        if (deleteFriendHelpers.isLoading) return;

        void deleteFriendTrigger({ targetId: userId });
    };

    return (
        <>
            <BaseActionButton
                label={t('FriendsPanel.Friends.goToConversationButton.label')}
                onClick={handleNavigateToChat}
                sprite={ASSETS.IMAGES.SPRITE.MESSAGE_BUBBLE_ICON}
                tooltip={t('FriendsPanel.Friends.goToConversationButton.tooltip')}
                userId={userId}
                isLoading={isConversationLoading}
            />

            <BaseActionButton
                label={t('FriendsPanel.AllFriends.deleteFriendButton.label')}
                onClick={handleDeleteFriend}
                sprite={ASSETS.IMAGES.SPRITE.GARBAGE_CAN_ICON}
                tooltip={t('FriendsPanel.AllFriends.deleteFriendButton.tooltip')}
                userId={userId}
                isLoading={deleteFriendHelpers.isLoading}
            />
        </>
    );
};