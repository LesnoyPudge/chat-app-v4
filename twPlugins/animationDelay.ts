import plugin from 'tailwindcss/plugin';



export const animationDelay = () => (
    plugin(({ matchUtilities }) => {
        matchUtilities(
            {
                'animation-delay': (value: string) => {
                    return {
                        'animation-delay': value,
                    };
                },
            },
            {
                values: Array.from({
                    length: 21,
                }).reduce<Record<string, string>>((acc, __, index) => {
                    const value = index * 50;

                    acc[value] = `${value}ms`;

                    return acc; ;
                }, {}),
            },
        );
    })
);