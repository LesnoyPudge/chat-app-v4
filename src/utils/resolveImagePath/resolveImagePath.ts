import { Valibot } from '@/libs';
import { sharedValidators } from '@/fakeShared';
import { ASSETS } from '@/generated/ASSETS';
import { T } from '@lesnoypudge/types-utils-base';
import { ClientEntities } from '@/types';
import { getAssetUrl, getFilePathById, logger } from '@/utils';



const assetSchema = Valibot.object({
    PATH: sharedValidators.singleCommonString,
    NAME: sharedValidators.singleCommonString,
});

const encodedFileSchema = sharedValidators.file;

export namespace resolveImagePath {
    type CommonImageAssets = T.ValueOf<typeof ASSETS.IMAGES.COMMON>;

    type SpriteImageAssets = T.ValueOf<typeof ASSETS.IMAGES.SPRITE>;

    export type ImagePointer = (
        CommonImageAssets
        | SpriteImageAssets
        | ClientEntities.File.Encoded
        | string
        | null
        | undefined
    );

    export type GetReturn<_Pointer extends ImagePointer> = (
        _Pointer extends (null | undefined)
            ? (string | null)
            : string
    );
}

export const resolveImagePath = <
    _Pointer extends resolveImagePath.ImagePointer,
>(
    imagePointer: _Pointer,
): resolveImagePath.GetReturn<_Pointer> => {
    if (!imagePointer) return null as resolveImagePath.GetReturn<_Pointer>;

    if (typeof imagePointer === 'string') {
        const maybeId = getFilePathById(imagePointer);
        if (maybeId) return maybeId;
    }

    const assetParseResult = Valibot.safeParse(assetSchema, imagePointer);
    if (assetParseResult.success) {
        return getAssetUrl(assetParseResult.output);
    }

    const encodedFileParseResult = Valibot.safeParse(
        encodedFileSchema, imagePointer,
    );
    if (encodedFileParseResult.success) {
        return encodedFileParseResult.output.base64;
    }

    logger._warns.log('Provided image pointer does not match any schema');
    logger._warns.trace();

    return null as resolveImagePath.GetReturn<_Pointer>;
};