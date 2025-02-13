import { createStyles } from '@utils';



const styles = createStyles({
    SR_INPUT: `
        absolute
        inset-0
        cursor-pointer
        text-0
        opacity-0
    `,

    SCREEN: `
        relative
        isolate
        h-[100dvh]
        w-dvw
    `,

    IMAGE_BG_FULLSCREEN: `
        absolute
        left-0
        top-0
        -z-50
        h-[100dvh]
        w-[100dvw]
        object-cover
        object-center
    `,
});

export const CUSTOM_STYLES = styles;