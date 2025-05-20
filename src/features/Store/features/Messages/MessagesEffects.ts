import { createEffects } from '@/store/utils';
import { globalActions } from '@/store/globalActions';
import { MessagesSlice } from './MessagesSlice';
// import { soundManager } from '@/features';
import { ASSETS } from '@/generated/ASSETS';
import { App } from '../App';
import { Servers } from '../Servers';
import { Users } from '../Users';



const playNotificationSound = () => {
    // soundManager.play(ASSETS.SOUNDS.DISCORD_NOTIFICATION);
};

export const MessagesEffects = createEffects({
    listenerMiddlewares: [
        ({ startListening }) => startListening({
            actionCreator: globalActions.addSocketData,
            effect: ({ payload }, { dispatch, getState }) => {
                const { Messages } = payload;
                if (!Messages?.length) return;

                dispatch(MessagesSlice.actions.upsertMany(Messages));

                const state = getState();

                const currentTextChat = (
                    App.Selectors.selectCurrentTextChat(state)
                );

                const { lastSeenMessages } = (
                    Users.Selectors.selectCurrentUser(state)
                );

                Messages.forEach((message) => {
                    const textChatId = message.textChat;

                    if (currentTextChat === textChatId) return;

                    const lastIndex = lastSeenMessages[textChatId];

                    if (
                        (lastIndex !== undefined)
                        && (lastIndex >= message.index)
                    ) return;

                    const serverId = message.server;
                    if (serverId) {
                        const isMuted = (
                            Servers.Selectors.selectIsMutedById(serverId)
                        )(state);

                        if (isMuted) return;

                        playNotificationSound();

                        return;
                    }

                    playNotificationSound();
                });
            },
        }),
    ],
});