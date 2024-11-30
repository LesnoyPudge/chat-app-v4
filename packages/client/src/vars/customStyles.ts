import { createStyles } from '@utils';



const styles = createStyles({
    SR_INPUT: `
        absolute
        inset-0
        cursor-pointer
        text-0
        opacity-0
    `,

    FOCUSED: `
        outline-focus
    `,

    FOCUS_HIDDEN: `
        outline-transparent
    `,

    SCREEN: `
        relative
        isolate
        h-full
        w-full
    `,

    IMAGE_BG_FULLSCREEN: `
        absolute
        left-0
        top-0
        -z-50
        h-dvh
        w-dvw
        object-cover
        object-center
    `,
});

export const CUSTOM_STYLES = styles;