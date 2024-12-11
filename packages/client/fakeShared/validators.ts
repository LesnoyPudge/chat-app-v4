import * as v from 'valibot';
import { Endpoints } from './endpoints';
import { T } from '@lesnoypudge/types-utils-base/namespace';
import { t } from '@i18n';
import { promiseToBoolean } from '@lesnoypudge/utils';
import { Emoji, type RichTextEditor } from '@components';



// type SimpleId<_Shape extends T.UnknownRecord> = T.Override<
//     _Shape,
//     `id` | `${string}Id`,
//     string
// >;

const schema = <
    _Shape extends T.UnknownRecord,
>(
    schema: v.GenericSchema<_Shape>,
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

    RTEText = v.customAsync<RichTextEditor.Types.Text>((value) => {
        return promiseToBoolean(v.parseAsync(
            schema<RichTextEditor.Types.Text>(
                v.object({
                    text: v.string(),
                    bold: v.pipe(v.optional(v.boolean())),
                    italic: v.pipe(v.optional(v.boolean())),
                }),
            ),
            value,
        ));
    });

    RTEParagraph = v.customAsync<
        RichTextEditor.Types.Elements.Paragraph
    >((value) => {
        return promiseToBoolean(v.parseAsync(
            v.objectAsync({
                type: v.literal('paragraph'),
                children: this.RTENodes,
            }),
            value,
        ));
    });

    RTELink = v.customAsync<
        RichTextEditor.Types.Elements.Link
    >((value) => {
        return promiseToBoolean(v.parseAsync(
            v.pipeAsync(
                v.objectAsync({
                    type: v.literal('link'),
                    url: v.pipe(
                        this.commonString,
                        v.url(),
                    ),
                    children: v.pipeAsync(
                        v.arrayAsync(this.RTEText),
                        v.length(1),
                    ),
                }),
                v.check((link) => link.url === link.children[0]?.text),
            ),
            value,
        ));
    });

    RTEEmoji = v.customAsync<
        RichTextEditor.Types.Elements.Emoji
    >((value) => {
        return promiseToBoolean(v.parseAsync(
            v.pipeAsync(
                v.objectAsync({
                    type: v.literal('emoji'),
                    code: v.pipe(
                        v.string(),
                        v.regex(Emoji.Store.emojiCodeWithAliasesRegExp),
                    ),
                    children: v.pipeAsync(
                        v.arrayAsync(v.pipeAsync(
                            this.RTEText,
                            v.object({
                                text: v.pipe(
                                    v.string(),
                                    v.regex(
                                        Emoji.Store.emojiCodeWithAliasesRegExp,
                                    ),
                                ),
                            }),
                        )),
                        v.length(1),
                    ),
                }),
                v.check((emoji) => {
                    return emoji.code === emoji.children[0]?.text;
                }),
            ),
            value,
        ));
    });

    RTENodes = v.arrayAsync(v.customAsync<
        RichTextEditor.Types.Node
    >(async (nodes) => {
        const results = await Promise.allSettled([
            this.RTEText.check(nodes),
            this.RTEEmoji.check(nodes),
            this.RTELink.check(nodes),
            this.RTEParagraph.check(nodes),
        ]);

        const result = results.some((result) => result.status === 'fulfilled');

        // some strange error if result is returned
        if (result) {
            return true;
        }

        return false;
    }));
}

const sv = new SharedValidators();

export const sharedValidators = sv;

export namespace ApiValidators {
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