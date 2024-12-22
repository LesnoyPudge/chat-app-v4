import { params } from './params';



const {
    channelId,
    conversationId,
    invitationCode,
    serverId,
} = params;

// every path have to start from root
class Paths {
    root = `/` as const;
    auth = `/auth` as const;
    invitation = `/invitation/${invitationCode}` as const;
    conversation = `/conversation/${conversationId}` as const;
    server = `/server/${serverId}` as const;
    channel = `${this.server}/channel/${channelId}` as const;
}

export const staticNavigatorPath = { ...new Paths() };