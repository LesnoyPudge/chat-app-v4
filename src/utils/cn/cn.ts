import { clsx } from 'clsx';
import {
    createTailwindMerge,
    getDefaultConfig,
    mergeConfigs,
} from 'tailwind-merge';



// https://github.com/dcastil/tailwind-merge
export const customTwMerge = createTailwindMerge(getDefaultConfig, (config) =>
    mergeConfigs(config, {
        extend: {
            classGroups: {
                'font-size': [{ text: [
                    '25-30',
                    '20-24',
                    '17-22',
                    '12-16',
                    '10-12',
                    '0',
                ] }],
            },
        },
    }),
);

// Parameters<typeof clsx>
type Args = (string | boolean | undefined)[];

export const cn = (...args: Args): string => {
    if (
        args.length === 2
        && (args[1] === undefined || args[1] === '')
    ) {
        if (typeof args[0] === 'string') return args[0];

        return '';
    };

    return customTwMerge(clsx(args));
};