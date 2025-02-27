import { createStyles } from '@utils';



export const styles = createStyles({
    wrapper: `
        h-[90dvh] 
        min-w-[min(200px,100dvw)]
        rounded-sm 
        bg-primary-600 
        px-2
        py-1.5 
        shadow-elevation-high
    `,
    scrollable: `
        flex
        flex-col 
        gap-1 
    `,
    button: `
        group/button 
        flex 
        h-8
        w-full
        shrink-0
        items-center
        justify-between 
        gap-3 
        truncate 
        rounded 
        px-2
        py-1.5 
        text-start 
        text-sm 
        font-medium 
        text-color-secondary 
        hover-focus-visible:bg-brand
        hover-focus-visible:text-white 
    `,
    icon: `
        size-5
        fill-icon-300 
        hover-focus-visible/button:fill-white 
    `,
});