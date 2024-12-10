import plugin from 'tailwindcss/plugin';



export const variants = () => plugin(({ addVariant }) => {
    addVariant('hover-focus-visible', ['&:hover', '&:focus-visible']);
});