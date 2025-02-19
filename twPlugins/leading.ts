import plugin from 'tailwindcss/plugin';



export const leading = () => (
    plugin(({ matchUtilities }) => {
        // matchUtilities(
        //     {
        //         'leading': (value) => {
        //             return {
        //                 'line-height': value,
        //             };
        //         },
        //     },
        //     {
        //         values: {
        //             ...Array.from({
        //                 length: 41,
        //             }).fill('').map((_, i) => {
        //                 return i / 4;
        //             }).reduce<Record<string, string>>((acc, cur) => {
        //                 acc[cur] = `${cur * 0.25}rem`;
        //                 return acc;
        //             }, {}),
        //         },
        //     },
        // );
    })
);