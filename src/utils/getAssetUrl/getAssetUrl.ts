


type AssetItem = {
    NAME: string;
    PATH: string;
};

const cache = new Map<string, string>();

export const getAssetUrl = (assetItem: AssetItem): string => {
    const found = cache.get(assetItem.PATH);
    if (found) return found;

    const { href } = new URL(
        `../../../generated/assets/${assetItem.PATH}`,
        import.meta.url,
    );

    cache.set(assetItem.PATH, href);

    return href;
};