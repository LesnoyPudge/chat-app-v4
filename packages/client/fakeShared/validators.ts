import * as v from 'valibot';
import { Endpoints } from './endpoints';
import { T } from '@lesnoypudge/types-utils-base/namespace';
import { t } from '@i18n';



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

const VALIDATION_ERRORS = {
    REQUIRED: t('ValidationErrors.required'),
    INVALID_EMAIL: t('ValidationErrors.invalidEmail'),
} as const;

const ve = VALIDATION_ERRORS;

class SharedValidators {
    commonString = v.pipe(
        v.string(),
        v.trim(),
        v.nonEmpty(ve.REQUIRED),
    );

    id = v.pipe(
        this.commonString,
        v.uuid(),
    );

    email = v.pipe(
        this.commonString,
        v.email(ve.INVALID_EMAIL),
    );
}

const sv = new SharedValidators();

export namespace Validators {
    export namespace V1 {
        export namespace User {
            import User = Endpoints.V1.User;

            export const {
                login,
                registration,
            } = {
                [User.Login.ActionName]: (
                    schema<User.Login.RequestBody>(v.object({
                        login: sv.commonString,
                        password: sv.commonString,
                    }))
                ),
                [User.Registration.ActionName]: (
                    schema<User.Registration.RequestBody>(v.object({
                        name: sv.commonString,
                        login: sv.commonString,
                        password: sv.commonString,
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