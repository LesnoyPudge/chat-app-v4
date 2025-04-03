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

export const localStorageApi = new LocalStorage<localStorageApi.Storage>();