


const cache = new Map<string, string>();

export const getAssetUrl = (fileName: CommonAssetNames) => {
    const found = cache.get(fileName);
    if (found) {
        return found;
    }

    const { href } = new URL(
        `../../generated/assets/${fileName}`,
        import.meta.url,
    );

    cache.set(fileName, href);

    return href;
};