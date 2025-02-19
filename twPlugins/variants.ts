import plugin from 'tailwindcss/plugin';



export const variants = () => plugin(({
    addVariant,
    matchVariant,
}) => {
    const addComplexVariant = (
        firstPart: string,
        secondPart: string,
    ) => {
        const name = `${firstPart}-${secondPart}`;

        addVariant(
            name,
            [
                `&:${firstPart}`,
                `&:${secondPart}`,
            ],
        );

        const getState = (
            state: 'group' | 'peer',
            modifier?: string,
        ) => {
            const _modifier = modifier ? `\\/${modifier}` : '';
            const _selector = state === 'group' ? '&' : '~ &';

            return [
                `:merge(.${state}${_modifier}):${firstPart} ${_selector}`,
                `:merge(.${state}${_modifier}):${secondPart} ${_selector}`,
            ];
        };

        matchVariant(
            'group',
            (_, { modifier }) => (
                modifier
                    ? getState('group', modifier)
                    : getState('group')
            ),
            {
                values: {
                    [name]: name,
                },
            },
        );

        matchVariant(
            'peer',
            (_, { modifier }) => (
                modifier
                    ? getState('peer', modifier)
                    : getState('peer')
            ),
            {
                values: {
                    [name]: name,
                },
            },
        );
    };

    addComplexVariant('hover', 'focus-visible');

    addComplexVariant('hover', 'focus-within');
});