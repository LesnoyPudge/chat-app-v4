import { createStyles } from '@/utils';



const styles = createStyles({
    inner: `
        min-h-[--message-editor-height] 
        rounded-lg 
        bg-primary-100
    `,
    stickyControl: `
        sticky 
        top-0 
        aspect-square 
        h-[--message-editor-height] 
        shrink-0
    `,
    buttonWithIcon: `
        group/button 
        p-2.5
        data-[loading=true]:animate-pulse
    `,
    buttonIcon: `
        size-full 
        fill-icon-200
        group-hover-focus-visible/button:fill-icon-100
    `,
});

export const sharedStyles = styles;