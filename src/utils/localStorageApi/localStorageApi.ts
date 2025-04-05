import { ClientEntities } from '@/types';
import { LocalStorage } from '@lesnoypudge/utils-web';



export namespace localStorageApi {
    type UserPreferences = ClientEntities.User.Settings;

    export type Storage = (
        UserPreferences
        & {
            isDeaf: boolean;
            isMute: boolean;
            refreshToken: string;
            accessToken: string;
            shouldPopulate: 'none' | 'small' | 'medium' | 'large';
            lastVisitedChannels: Record<
                ClientEntities.Server.Id,
                ClientEntities.Channel.Id
            >;
        }
    );
}

const api = new LocalStorage<localStorageApi.Storage>();

export const localStorageApi = Object.assign(api, {
    removeSensitiveData: () => {
        localStorageApi.remove('isDeaf');
        localStorageApi.remove('isMute');
        localStorageApi.remove('accessToken');
        localStorageApi.remove('refreshToken');
        localStorageApi.remove('messageDisplayMode');
        localStorageApi.remove('messageFontSize');
        localStorageApi.remove('messageGroupSpacing');
        localStorageApi.remove('theme');
        localStorageApi.remove('lastVisitedChannels');
    },
});