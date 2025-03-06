import { createStyles } from '@/utils';



export const styles = createStyles({
    wrapper: `
        flex
        max-h-[90dvh]
        min-w-[min(200px,100dvw)] 
        flex-col 
        rounded-sm
        bg-primary-600
        shadow-elevation-high
    `,
    scrollable: `
        flex
        flex-col 
        gap-1 
        py-2.5 
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