import { T } from '@lesnoypudge/types-utils-base/namespace';
import { HTTP_METHODS } from '@lesnoypudge/utils';
import { ClientEntities as Entities } from '@/types';
import { ENTITY_NAME } from './entity';



const toKebabCase = <
    _Text extends string,
>(
    text: _Text,
): T.KebabCase<_Text> => {
    return (
        text
            .split(/(?=[A-Z])/).join('-')
            .toLowerCase() as T.KebabCase<_Text>
    );
};

const v1 = <
    _Entity extends string,
    _Action extends string,
>(
    entity: _Entity,
    action: _Action,
) => {
    return `/api/v1/${toKebabCase(entity)}/${toKebabCase(action)}` as const;
};


namespace WithId {
    export type User = {
        userId: Entities.User.Id;
    };

    export type Server = {
        serverId: Entities.Server.Id;
    };

    export type TextChat = {
        textChatId: Entities.TextChat.Id;
    };

    export type File = {
        file: Entities.File.Id;
    };

    export type Message = {
        messageId: Entities.Message.Id;
    };

    export type Conversation = {
        conversationId: Entities.Conversation.Id;
    };

    export type Role = {
        role: Entities.Role.Id;
    };

    export type Channel = {
        channelId: Entities.Channel.Id;
    };

    export type Target = {
        targetId: Entities.User.Id;
    };
}

namespace WithIds {
    export type User = {
        userIds: Entities.User.Id[];
    };

    export type Server = {
        serverIds: Entities.Server.Id[];
    };

    export type TextChat = {
        textChatIds: Entities.TextChat.Id[];
    };

    export type VoiceChat = {
        voiceChatIds: Entities.VoiceChat.Id[];
    };

    export type File = {
        fileIds: Entities.File.Id[];
    };

    export type Message = {
        messageIds: Entities.Message.Id[];
    };

    export type Conversation = {
        conversationIds: Entities.Conversation.Id[];
    };

    export type Role = {
        roleIds: Entities.Role.Id[];
    };

    export type Channel = {
        channelIds: Entities.Channel.Id[];
    };

    export type Target = {
        targetIds: Entities.User.Id[];
    };
}

type AppData = {
    userData: Entities.User.Base;
    [ENTITY_NAME.CHANNEL]: Entities.Channel.Base[];
    [ENTITY_NAME.CONVERSATION]: Entities.Conversation.Base[];
    [ENTITY_NAME.MESSAGE]: Entities.Message.Base[];
    [ENTITY_NAME.ROLE]: Entities.Role.Base[];
    [ENTITY_NAME.SERVER]: Entities.Server.Base[];
    [ENTITY_NAME.TEXT_CHAT]: Entities.TextChat.Base[];
    [ENTITY_NAME.USER]: Entities.User.Base[];
    [ENTITY_NAME.VOICE_CHAT]: Entities.VoiceChat.Base[];
};

namespace EndpointsV1 {
    export namespace User {
        const BasePath = ENTITY_NAME.USER;

        export namespace Registration {
            export const ActionName = 'registration';

            export const Path = v1(BasePath, ActionName);

            export const Method = HTTP_METHODS.POST;

            export type RequestBody = Pick<
                Entities.User.Base,
                'login' | 'password' | 'name'
            >;

            export type Response = AppData;
        }

        export namespace Login {
            export const ActionName = 'login';

            export const Path = v1(BasePath, ActionName);

            export const Method = HTTP_METHODS.POST;

            export type RequestBody = Pick<
                Entities.User.Base,
                'login' | 'password'
            >;

            export type Response = AppData;
        }

        export namespace Logout {
            export const ActionName = 'logout';

            export const Path = v1(BasePath, ActionName);

            export const Method = HTTP_METHODS.POST;

            export type RequestBody = Pick<
                Entities.User.Base,
                'refreshToken'
            >;

            export type Response = void;
        }

        export namespace Refresh {
            export const ActionName = 'refresh';

            export const Path = v1(BasePath, ActionName);

            export const Method = HTTP_METHODS.POST;

            export type RequestBody = (
                Pick<
                    Entities.User.Base,
                    'refreshToken'
                >
                & {
                    withData?: boolean;
                }
            );

            export type Response = AppData;
        }

        export namespace MuteServer {
            export const ActionName = 'muteServer';

            export const Path = v1(BasePath, ActionName);

            export const Method = HTTP_METHODS.POST;

            export type RequestBody = WithId.Server;

            export type Response = Entities.User.Base;
        }

        export namespace UnmuteServer {
            export const ActionName = 'unmuteServer';

            export const Path = v1(BasePath, ActionName);

            export const Method = HTTP_METHODS.POST;

            export type RequestBody = WithId.Server;

            export type Response = Entities.User.Base;
        }

        export namespace MarkServerNotificationsAsRead {
            export const ActionName = 'markServerNotificationsAsRead';

            export const Path = v1(BasePath, ActionName);

            export const Method = HTTP_METHODS.POST;

            export type RequestBody = WithId.Server;

            export type Response = Entities.User.Base;
        }

        export namespace MuteConversation {
            export const ActionName = 'muteConversation';

            export const Path = v1(BasePath, ActionName);

            export const Method = HTTP_METHODS.POST;

            export type RequestBody = WithId.Conversation;

            export type Response = Entities.User.Base;
        }

        export namespace UnmuteConversation {
            export const ActionName = 'unmuteConversation';

            export const Path = v1(BasePath, ActionName);

            export const Method = HTTP_METHODS.POST;

            export type RequestBody = WithId.Conversation;

            export type Response = Entities.User.Base;
        }

        export namespace MarkConversationNotificationsAsRead {
            export const ActionName = 'markConversationNotificationsAsRead';

            export const Path = v1(BasePath, ActionName);

            export const Method = HTTP_METHODS.POST;

            export type RequestBody = WithId.Conversation;

            export type Response = Entities.User.Base;
        }

        export namespace HideConversation {
            export const ActionName = 'hideConversation';

            export const Path = v1(BasePath, ActionName);

            export const Method = HTTP_METHODS.POST;

            export type RequestBody = WithId.Conversation;

            export type Response = Entities.User.Base;
        }

        export namespace GetMany {
            export const ActionName = 'getMany';

            export const Path = v1(BasePath, ActionName);

            export const Method = HTTP_METHODS.POST;

            export type RequestBody = WithIds.User;

            export type Response = Entities.User.Base[];
        }

        export namespace ProfileUpdate {
            export const ActionName = 'profileUpdate';

            export const Path = v1(BasePath, ActionName);

            export const Method = HTTP_METHODS.POST;

            export type RequestBody = T.Simplify<
                Partial<T.Override<
                    Pick<
                        Entities.User.Base,
                        'name' | 'settings' | 'extraStatus' | 'avatar'
                    >,
                    'avatar',
                    Entities.File.Encoded | null
                >>
            >;

            export type Response = Entities.User.Base;
        }
    }

    export namespace Server {
        const BasePath = ENTITY_NAME.SERVER;

        export namespace GetByInvitationCode {
            export const ActionName = 'getByInvitationCode';

            export const Path = v1(BasePath, ActionName);

            export const Method = HTTP_METHODS.POST;

            export type RequestBody = {
                invitationCode: string;
            };

            export type Response = Entities.Server.Base;
        }

        export namespace AcceptInvitation {
            export const ActionName = 'acceptInvitation';

            export const Path = v1(BasePath, ActionName);

            export const Method = HTTP_METHODS.POST;

            export type RequestBody = {
                invitationCode: string;
            };

            export type Response = Entities.Server.Base;
        }

        export namespace Create {
            export const ActionName = 'create';

            export const Path = v1(BasePath, ActionName);

            export const Method = HTTP_METHODS.POST;

            export type RequestBody = T.Simplify<
                Pick<Entities.Server.Base, 'name' | 'identifier'>
                & T.Override<
                    Pick<
                        Entities.Server.Base,
                        'avatar'
                    >,
                    'avatar',
                    Entities.File.Encoded | null
                >
            >;

            export type Response = Entities.Server.Base;
        }

        export namespace Leave {
            export const ActionName = 'leave';

            export const Path = v1(BasePath, ActionName);

            export const Method = HTTP_METHODS.POST;

            export type RequestBody = WithId.Server;

            export type Response = void;
        }

        export namespace GetMany {
            export const ActionName = 'getMany';

            export const Path = v1(BasePath, ActionName);

            export const Method = HTTP_METHODS.POST;

            export type RequestBody = WithIds.Server;

            export type Response = Entities.Server.Base[];
        }

        export namespace GetManyDeep {
            export const ActionName = 'getManyDeep';

            export const Path = v1(BasePath, ActionName);

            export const Method = HTTP_METHODS.POST;

            export type RequestBody = WithIds.Server;

            export type Response = Pick<
                AppData,
                'Server'
                | 'User'
                | 'Channel'
                | 'Role'
                | 'TextChat'
                | 'VoiceChat'
            >;
        }
    }

    export namespace Channel {
        const BasePath = ENTITY_NAME.CHANNEL;

        export namespace GetMany {
            export const ActionName = 'getMany';

            export const Path = v1(BasePath, ActionName);

            export const Method = HTTP_METHODS.POST;

            export type RequestBody = WithIds.Channel;

            export type Response = Entities.Channel.Base[];
        }
    }

    export namespace Conversation {
        const BasePath = ENTITY_NAME.CONVERSATION;

        export namespace GetMany {
            export const ActionName = 'getMany';

            export const Path = v1(BasePath, ActionName);

            export const Method = HTTP_METHODS.POST;

            export type RequestBody = WithIds.Conversation;

            export type Response = Entities.Conversation.Base[];
        }

        export namespace GetManyDeep {
            export const ActionName = 'getManyDeep';

            export const Path = v1(BasePath, ActionName);

            export const Method = HTTP_METHODS.POST;

            export type RequestBody = WithIds.Conversation;

            export type Response = Pick<
                AppData,
                'Conversation' | 'User' | 'TextChat' | 'VoiceChat'
            >;
        }
    }

    export namespace Role {
        const BasePath = ENTITY_NAME.ROLE;

        export namespace GetMany {
            export const ActionName = 'getMany';

            export const Path = v1(BasePath, ActionName);

            export const Method = HTTP_METHODS.POST;

            export type RequestBody = WithIds.Role;

            export type Response = Entities.Role.Base[];
        }
    }

    export namespace TextChat {
        const BasePath = ENTITY_NAME.TEXT_CHAT;

        export namespace GetMany {
            export const ActionName = 'getMany';

            export const Path = v1(BasePath, ActionName);

            export const Method = HTTP_METHODS.POST;

            export type RequestBody = WithIds.TextChat;

            export type Response = Entities.TextChat.Base[];
        }
    }

    export namespace Message {
        const BasePath = ENTITY_NAME.MESSAGE;
    }

    export namespace VoiceChat {
        const BasePath = ENTITY_NAME.VOICE_CHAT;

        // export namespace GetMany {
        //     export const ActionName = 'getMany';

        //     export const Path = v1(BasePath, ActionName);

        //     export const Method = HTTP_METHODS.POST;

        //     export type RequestBody = WithIds.VoiceChat;

        //     export type Response = Entities.VoiceChat.Base[];
        // }
    }

    export namespace File {
        const BasePath = ENTITY_NAME.FILE;

        export namespace Read {
            export const ActionName = 'read';

            export const Path = v1(BasePath, ActionName);

            export const Method = HTTP_METHODS.GET;

            export type RequestBody = void;

            export type RequestParams = WithId.File;

            export type Response = void;
        }
    }
}

export namespace Endpoints {
    export import V1 = EndpointsV1;
}