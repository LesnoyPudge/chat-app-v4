import * as v from 'valibot';
import { Endpoints } from './endpoints';
import { T } from '@lesnoypudge/types-utils-base/namespace';



type SimpleId<_Shape extends T.UnknownRecord> = T.Override<
    _Shape,
    `id` | `${string}Id`,
    string
>;

const schema = <
    _Shape extends T.UnknownRecord,
>(
    schema: v.GenericSchema<SimpleId<_Shape>>,
) => schema;

class SharedValidators {
    commonString = v.pipe(
        v.string(),
        v.trim(),
    );

    id = v.pipe(
        this.commonString,
        v.nonEmpty(),
        v.uuid(),
    );
}

const sv = new SharedValidators();

export namespace Validators {
    export namespace V1 {
        export namespace User {
            import User = Endpoints.V1.User;

            export const {
                login,
            } = {
                [User.Login.ActionName]: (
                    schema<User.Login.RequestBody>(v.object({
                        login: v.string(),
                        password: v.string(),
                    }))
                ),
            };
        }

        export namespace Server {
            import Server = Endpoints.V1.Server;
        }

        export namespace Channel {
            import Channel = Endpoints.V1.Channel;
        }

        export namespace Role {
            import Role = Endpoints.V1.Role;
        }

        export namespace Conversation {
            import Conversation = Endpoints.V1.Conversation;
        }

        export namespace Message {
            import Message = Endpoints.V1.Message;
        }

        export namespace File {
            import File = Endpoints.V1.File;
        }

        export namespace TextChat {
            import TextChat = Endpoints.V1.TextChat;
        }
    }
}