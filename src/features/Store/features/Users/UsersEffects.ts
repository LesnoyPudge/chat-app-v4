import { createEffects } from '@/store/utils';
import { globalActions } from '@/store/globalActions';
import { App } from '../App';
import { selectCurrentUser } from './UsersSelectors';
import { combinedFunction, sortFns } from '@lesnoypudge/utils';
import { UsersSlice } from './UsersSlice';
import { addEventListener } from '@lesnoypudge/utils-web';
import { minutesToMilliseconds } from 'date-fns';
import { UsersApi } from './UsersApi';



const AKF_DELAY = minutesToMilliseconds(5);

const eventNames = [
    'mousemove',
    'mousedown',
    'keydown',
    'click',
    'scroll',
    'wheel',
    'touchstart',
    'touchmove',
] as const;

export const UsersEffects = createEffects({
    effects: (store) => [
        (() => {
            let timeoutId: number;
            let isOnlineFetching = false;
            let isOfflineFetching = false;

            const goOnline = () => {
                if (isOnlineFetching) return;

                const { extraStatus } = selectCurrentUser(store.getState());
                const isOnline = extraStatus === 'default';
                if (isOnline) return;

                isOnlineFetching = true;

                void store.dispatch(
                    UsersApi.endpoints.UserProfileUpdate.initiate({
                        extraStatus: 'default',
                    }),
                ).finally(() => {
                    isOnlineFetching = false;
                });
            };

            const goAfk = () => {
                if (isOfflineFetching) return;

                const { extraStatus } = selectCurrentUser(store.getState());
                const isAfk = extraStatus === 'afk';
                if (isAfk) return;

                isOfflineFetching = true;

                void store.dispatch(
                    UsersApi.endpoints.UserProfileUpdate.initiate({
                        extraStatus: 'afk',
                    }),
                ).finally(() => {
                    isOfflineFetching = false;
                });
            };

            const startTimer = () => {
                goOnline();
                clearTimeout(timeoutId);
                timeoutId = setTimeout(goAfk, AKF_DELAY);
            };

            startTimer();

            const events = eventNames.map((eventName) => {
                return addEventListener(window, eventName, startTimer);
            });

            return combinedFunction(...events);
        })(),
    ],

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