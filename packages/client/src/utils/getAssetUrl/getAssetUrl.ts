


export const getAssetUrl = (fileName: CommonAssetNames) => {
    // eslint-disable-next-line unicorn/relative-url-style
    return new URL(`./generated/assets/${fileName}`, import.meta.url).href;
};