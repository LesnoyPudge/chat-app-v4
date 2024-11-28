import { clsx } from 'clsx';
import {
    createTailwindMerge,
    getDefaultConfig,
    mergeConfigs,
} from 'tailwind-merge';



// https://github.com/dcastil/tailwind-merge/blob/v1.10.0/docs/
export const customTwMerge = createTailwindMerge(getDefaultConfig, (config) =>
    mergeConfigs(config, {
        extend: {
            classGroups: {},
        },
    }),
);

export const cn = (...args: Parameters<typeof clsx>): string => {
    if (
        args.length === 2
        && (args[1] === undefined || args[1] === '')
        && typeof args[0] === 'string'
    ) return args[0];

    return customTwMerge(clsx(args));
};