


export const useInvitationScreen = () => {
    // get channel by invitationId
    const channel = {
        name: 'amazing channel',
        avatarId: 'https://i.pravatar.cc/80',
        membersCount: 3_228,
        onlineCount: 1_337,
    };

    const acceptInvitation = () => {
        console.log('click accept');
        fetch('/some');
    };

    return {
        channel,
        acceptInvitation,
    };
};