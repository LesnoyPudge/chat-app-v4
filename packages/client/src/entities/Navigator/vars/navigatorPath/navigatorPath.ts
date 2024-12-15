


export const navigatorPath = {
    auth: () => `/auth`,
    root: () => `/`,
    invitation: (invitationId: string) => {
        return `/invitation/${invitationId}`;
    },
    // anyPrivateChat: () => '/app/private-chat',
    // privateChat: (privateChatId: string) => `/app/private-chat/${privateChatId}`,
    // channel: (channelId: string) => `/app/channel/${channelId}`,
    // room: (channelId: string, roomId: string) => `/app/channel/${channelId}/room/${roomId}`,
};