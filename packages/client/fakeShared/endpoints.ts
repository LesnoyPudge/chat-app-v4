import { T } from '@lesnoypudge/types-utils-base/namespace';
import { HTTP_METHOD } from '@lesnoypudge/utils';
import { ClientEntities as Entities } from '@types';



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
    return `/api/v1/${entity}/${toKebabCase(action)}` as const;
};


namespace WithId {
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

namespace EndpointsV1 {
    export namespace User {
        export namespace Registration {
            export const ActionName = 'registration';

            export const Path = v1('user', ActionName);

            export const Method = HTTP_METHOD.POST;

            export type RequestBody = Pick<
                Entities.User.Base,
                'login' | 'password' | 'name'
            >;

            export type Response = Entities.User.Base;
        }

        export namespace Login {
            export const ActionName = 'login';

            export const Path = v1('user', ActionName);

            export const Method = HTTP_METHOD.POST;

            export type RequestBody = Pick<
                Entities.User.Base,
                'login' | 'password'
            >;

            export type Response = Entities.User.Base;
        }

        export namespace Logout {
            export const ActionName = 'logout';

            export const Path = v1('user', ActionName);

            export const Method = HTTP_METHOD.POST;

            export type RequestBody = Pick<
                Entities.User.Base,
                'refreshToken'
            >;

            export type Response = void;
        }

        export namespace Refresh {
            export const ActionName = 'refresh';

            export const Path = v1('user', ActionName);

            export const Method = HTTP_METHOD.POST;

            export type RequestBody = Pick<
                Entities.User.Base,
                'refreshToken'
            >;

            export type Response = Entities.User.Base;
        }
    }

    export namespace Server {
        export namespace GetOneByInvitationCode {
            export const ActionName = 'getOneByInvitationCode';

            export const Path = v1('server', ActionName);

            export const Method = HTTP_METHOD.POST;

            export type RequestBody = {
                invitationCode: string;
            };

            export type Response = Entities.Server.Base;
        }

        export namespace AcceptInvitation {
            export const ActionName = 'acceptInvitation';

            export const Path = v1('server', ActionName);

            export const Method = HTTP_METHOD.POST;

            export type RequestBody = {
                invitationCode: string;
            };

            export type Response = Entities.Server.Base;
        }
    }

    export namespace File {
        export namespace Read {
            export const ActionName = 'read';

            export const Path = v1('file', ActionName);

            export const Method = HTTP_METHOD.GET;

            export type RequestBody = void;

            export type RequestParams = WithId.File;

            export type Response = void;
        }
    }
}

export namespace Endpoints {
    export import V1 = EndpointsV1;
}