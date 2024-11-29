


export const useInvitationScreen = () => {
    const channel = {
        name: 'amazing channel',
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