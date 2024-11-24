import { env } from '@vars';



export const getAssetUrl = (fileName: CommonAssetNames) => {
    return new URL(
        // eslint-disable-next-line unicorn/relative-url-style
        `./src/generated/assets/${fileName}`,
        env._PUBLIC_CLIENT_URL,
    ).href;
};