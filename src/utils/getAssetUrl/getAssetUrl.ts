import { ASSETS } from '@generated/ASSETS';
import { T } from '@lesnoypudge/types-utils-base/namespace';



type AssetItem = (
    T.ValueOf<ASSETS['IMAGES']['COMMON']>
    | T.ValueOf<ASSETS['IMAGES']['SPRITE']>
    | T.ValueOf<ASSETS['SOUNDS']>
    | T.ValueOf<ASSETS['VIDEOS']>
);

const cache = new Map<string, string>();

export const getAssetUrl = (assetItem: AssetItem) => {
    const found = cache.get(assetItem.PATH);
    if (found) return found;

    const { href } = new URL(
        `../../../generated/assets/${assetItem.PATH}`,
        import.meta.url,
    );

    cache.set(assetItem.PATH, href);

    return href;
};