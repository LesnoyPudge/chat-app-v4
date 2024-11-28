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
        isolate
        h-full
        w-full
    `,

    IMAGE_BG_FULLSCREEN: `
        fixed
        left-0
        top-0
        -z-10
        h-dvh
        w-dvw
        object-cover
        object-center
    `,
});

export const CUSTOM_STYLES = styles;