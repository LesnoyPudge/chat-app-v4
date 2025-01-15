import * as v from 'valibot';
import { Endpoints } from './endpoints';
import { T } from '@lesnoypudge/types-utils-base/namespace';
import { t } from '@i18n';
import { promiseToBoolean } from '@lesnoypudge/utils';
import type { RichTextEditor } from 'src/components/common/RichTextEditor';
import { EmojiStore } from 'src/components/media/Emoji/EmojiStore';
import type { ClientEntities } from '@types';
import { FILE_MAX_SIZE } from './vars';



const schema = <
    _Shape extends T.UnknownRecord,
>(
    schema: v.GenericSchema<_Shape>,
) => schema;

const VALIDATION_ERRORS = {
    REQUIRED: t('ValidationErrors.required'),
    INVALID_EMAIL: t('ValidationErrors.invalidEmail'),
    BAD_VALUE: t('ValidationErrors.badValue'),
} as const;

const ve = VALIDATION_ERRORS;

class SharedValidators {
    commonString = v.pipe(
        v.string(ve.BAD_VALUE),
        v.trim(),
        v.nonEmpty(ve.REQUIRED),
    );

    noWhitespaces = v.pipe(
        v.string(ve.BAD_VALUE),
        v.check((input) => input.split(' ').length === 1, ve.BAD_VALUE),
    );

    singleCommonString = v.pipe(
        this.commonString,
        this.noWhitespaces,
    );

    id = v.pipe(
        this.singleCommonString,
        v.uuid(ve.BAD_VALUE),
    );

    email = v.pipe(
        this.singleCommonString,
        v.email(ve.INVALID_EMAIL),
    );

    RTEText = v.customAsync<RichTextEditor.Types.Text>((value) => {
        return promiseToBoolean(v.parseAsync(
            schema<RichTextEditor.Types.Text>(
                v.object({
                    text: v.string(),
                    bold: v.pipe(v.optional(v.boolean())),
                    italic: v.pipe(v.optional(v.boolean())),
                }, ve.BAD_VALUE),
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
            }, ve.BAD_VALUE),
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
                        this.singleCommonString,
                        v.url(),
                    ),
                    children: v.pipeAsync(
                        v.arrayAsync(this.RTEText),
                        v.length(1),
                    ),
                }, ve.BAD_VALUE),
                v.check((link) => {
                    return link.url === link.children[0]?.text;
                }, ve.BAD_VALUE),
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
                        v.regex(EmojiStore.emojiCodeWithAliasesRegExp),
                    ),
                    children: v.pipeAsync(
                        v.arrayAsync(v.pipeAsync(
                            this.RTEText,
                            v.object({
                                text: v.pipe(
                                    v.string(),
                                    v.regex(
                                        EmojiStore.emojiCodeWithAliasesRegExp,
                                    ),
                                ),
                            }),
                        )),
                        v.length(1),
                    ),
                }, ve.BAD_VALUE),
                v.check((emoji) => {
                    return emoji.code === emoji.children[0]?.text;
                }, ve.BAD_VALUE),
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
    }), ve.BAD_VALUE);

    file = schema<ClientEntities.File.Encoded>(v.object({
        type: this.commonString,
        base64: v.pipe(
            this.singleCommonString,
            v.check((val) => v.safeParse(
                v.pipe(
                    this.singleCommonString,
                    v.base64(),
                ),
                val.split('base64,')[1],
            ).success),
        ),
        name: this.commonString,
        size: v.pipe(
            v.number(),
            v.maxValue(FILE_MAX_SIZE),
        ),
    }, ve.BAD_VALUE));

    nullableFile = v.nullable(this.file, ve.BAD_VALUE);
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
                        login: sv.singleCommonString,
                        password: sv.singleCommonString,
                    }))
                ),
                [User.Registration.ActionName]: (
                    schema<User.Registration.RequestBody>(v.object({
                        name: sv.commonString,
                        login: sv.singleCommonString,
                        password: sv.singleCommonString,
                    }))
                ),
            };
        }

        export namespace Server {
            import Server = Endpoints.V1.Server;

            export const {
                acceptInvitation,
                create,
                getByInvitationCode,
            } = {
                [Server.AcceptInvitation.ActionName]: (
                    schema<Server.AcceptInvitation.RequestBody>(v.object({
                        invitationCode: sv.singleCommonString,
                    }))
                ),
                [Server.Create.ActionName]: (
                    schema<Server.Create.RequestBody>(v.object({
                        name: sv.commonString,
                        identifier: sv.singleCommonString,
                        avatar: sv.nullableFile,
                    }))
                ),
                [Server.GetByInvitationCode.ActionName]: (
                    schema<Server.GetByInvitationCode.RequestBody>(v.object({
                        invitationCode: sv.singleCommonString,
                    }))
                ),
            };
        }

        // export namespace Channel {
        //     import Channel = Endpoints.V1.Channel;
        // }

        // export namespace Role {
        //     import Role = Endpoints.V1.Role;
        // }

        // export namespace Conversation {
        //     import Conversation = Endpoints.V1.Conversation;
        // }

        // export namespace Message {
        //     import Message = Endpoints.V1.Message;
        // }

        // export namespace File {
        //     import File = Endpoints.V1.File;
        // }

        // export namespace TextChat {
        //     import TextChat = Endpoints.V1.TextChat;
        // }
    }
}