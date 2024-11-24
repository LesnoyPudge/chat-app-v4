import plugin from 'tailwindcss/plugin';



const customClasses = {
    // '.image-bg-fullscreen': {
    //     '@apply fixed top-0 left-0 w-dvw h-dvh -z-[1] object-cover object-center': {},
    // },

    // '.overlay-item-wrapper': {
    //     '@apply pointer-events-none fixed inset-0': {},
    // },


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

    // '.message-font-size': {
    //     'font-size': 'var(--message-font-size)',
    //     'line-height': 'var(--message-line-height)',
    // },

    // '.message-y-padding': {
    //     'padding-top': 'var(--message-y-padding)',
    //     'padding-bottom': 'var(--message-y-padding)',
    // },

    // '.message-emoji-wrapper-size': {
    //     'height': 'var(--message-emoji-wrapper-height)',
    //     'width': 'var(--message-emoji-wrapper-width)',
    // },

    // '.message-emoji-font-size': {
    //     'font-size': 'var(--message-emoji-font-size)',
    // },

    // '.message-emoji-bg-size': {
    //     'background-size': 'var(--message-emoji-bg-size)',
    // },

    // '.message-group-head': {
    //     'padding-top': 'var(--message-gap)',
    // },
};

export const getCustomClasses = () => (
    plugin(({ addUtilities }) => {
        addUtilities(customClasses);
    })
);