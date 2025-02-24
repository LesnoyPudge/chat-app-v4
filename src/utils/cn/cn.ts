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
            theme: {
                animate: ['custom-pulse', 'placeholder'],
                shadow: [
                    'elevation-stroke',
                    'elevation-low',
                    'elevation-medium',
                    'elevation-high',
                ],
                text: [
                    '25-30',
                    '20-24',
                    '17-22',
                    '12-16',
                    '10-12',
                    '0',
                ],
            },
            classGroups: {
                'animation-delay': [{
                    'animation-delay': Array.from({
                        length: 21,
                    }).map((_, index) => {
                        return `${index * 50}`;
                    }),
                }],
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