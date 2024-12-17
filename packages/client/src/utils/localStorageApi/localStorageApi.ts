import { LocalStorage } from '@lesnoypudge/utils-web';



export namespace localStorageApi {
    export type Storage = {
        isDeaf: boolean;
        isMute: boolean;
        refreshToken: string;
        accessToken: string;
        // lastVisitedChannels: Record<ChannelId, RoomId>;
        // savedMessageDrafts: Record<ChatId, RTETypes.Nodes>;
    };
}

export const localStorageApi = new LocalStorage<localStorageApi.Storage>();