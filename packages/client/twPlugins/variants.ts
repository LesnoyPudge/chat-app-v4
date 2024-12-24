import plugin from 'tailwindcss/plugin';



export const variants = () => plugin(({ addVariant }) => {
    addVariant('hover-focus-visible', ['&:hover', '&:focus-visible']);
    addVariant('optional', '&:optional');
    addVariant(
        'group-hover-focus-visible',
        [
            ':merge(.group):hover &',
            ':merge(.group):focus-visible &',
        ],
    );
    addVariant(
        'peer-hover-focus-visible',
        [
            ':merge(.peer):hover ~ &',
            ':merge(.peer):focus-visible ~ &',
        ],
    );
});