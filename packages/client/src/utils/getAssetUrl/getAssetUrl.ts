


export const getAssetUrl = (fileName: CommonAssetNames) => {
    return new URL(
        `../../generated/assets/${fileName}`,
        import.meta.url,
    ).href;
};