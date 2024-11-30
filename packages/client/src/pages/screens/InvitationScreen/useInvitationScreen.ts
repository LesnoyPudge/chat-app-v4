


export const useInvitationScreen = () => {
    const channel = {
        name: 'amazing channel',
        avatarId: 'https://i.pravatar.cc/80',
        membersCount: 3_228,
        onlineCount: 1_337,
    };

    const acceptInvitation = () => {
        console.log('click accept');
    };

    return {
        channel,
        acceptInvitation,
    };
};