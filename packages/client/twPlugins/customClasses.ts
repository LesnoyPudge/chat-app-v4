import plugin from 'tailwindcss/plugin';
import { toOneLine } from '../src/utils/toOneLine';


const customClasses = {
    '.sr-input': {
        'position': 'absolute',
        'inset': '0',
        'opacity': '0',
        'fontSize': '0',
        'lineHeight': '0',
        'cursor': 'pointer',
    },

    '.focused': {
        'outline-color': 'var(--color-focus)',
    },

    '.focus-hidden': {
        'outline-color': 'transparent',
    },

    '.screen': {
        [toOneLine(`
            @apply 
            h-full 
            w-full 
            isolate
        `)]: {},
    },

    '.image-bg-fullscreen': {
        [toOneLine(`
            @apply 
            fixed 
            top-0 
            left-0 
            w-dvw 
            h-dvh 
            -z-10
            object-cover 
            object-center
        `)]: {},
    },
};

export const getCustomClasses = () => (
    plugin(({ addUtilities }) => {
        addUtilities(customClasses);
    })
);