import { createEffects } from '@/store/utils';
import { globalActions } from '@/store/globalActions';
import { App } from '../App';
import { selectCurrentUser } from './UsersSelectors';
import { sortFns } from '@lesnoypudge/utils';
import { UsersSlice } from './UsersSlice';



export const UsersEffects = createEffects({
    listenerMiddlewares: [
        ({ startListening }) => startListening({
            actionCreator: globalActions.addSocketData,
            effect: ({ payload }, { dispatch, getState }) => {
                const { Messages } = payload;
                if (!Messages?.length) return;

                const state = getState();

                const currentTextChatId = (
                    App.Selectors.selectCurrentTextChat(state)
                );
                if (!currentTextChatId) return;

                const { id, lastSeenMessages } = selectCurrentUser(state);

                const currentTextChatMessages = Messages.filter((v) => {
                    return v.textChat === currentTextChatId;
                });

                const [largestIndexMessage] = currentTextChatMessages.sort(
                    sortFns.descending.select((v) => v.index),
                );

                if (largestIndexMessage === undefined) return;

                const lastSavedIndex = lastSeenMessages[currentTextChatId];

                if (lastSavedIndex === largestIndexMessage.index) return;

                const nextLastIndex = Math.max(
                    lastSavedIndex ?? 0,
                    largestIndexMessage.index,
                );

                dispatch(UsersSlice.actions.updateOne({
                    id,
                    changes: {
                        lastSeenMessages: {
                            ...lastSeenMessages,
                            [currentTextChatId]: nextLastIndex,
                        },
                    },
                }));
            },
        }),
    ],
});