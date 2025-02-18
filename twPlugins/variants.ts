import plugin from 'tailwindcss/plugin';
import { PluginAPI } from 'tailwindcss/types/config';



const addComplexVariant = (
    firstPart: string,
    secondPart: string,
    fn: PluginAPI['addVariant'],
) => {
    fn(`${firstPart}-${secondPart}`, [`&:${firstPart}`, `&:${secondPart}`]);

    fn(
        `group-${firstPart}-${secondPart}`,
        [
            `:merge(.group):${firstPart} &`,
            `:merge(.group):${secondPart} &`,
        ],
    );

    fn(
        `peer-${firstPart}-${secondPart}`,
        [
            `:merge(.peer):${firstPart} ~ &`,
            `:merge(.peer):${secondPart} ~ &`,
        ],
    );
};

export const variants = () => plugin(({ addVariant }) => {
    addVariant('optional', '&:optional');

    addComplexVariant('hover', 'focus-visible', addVariant);

    addComplexVariant('hover', 'focus-within', addVariant);
});