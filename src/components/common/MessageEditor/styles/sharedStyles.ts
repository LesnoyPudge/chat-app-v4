import { createStyles } from '@/utils';



export const sharedStyles = createStyles({
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
    buttonWithIcon: 'group/button p-2.5',
    buttonIcon: `
        size-full 
        fill-icon-200
        group-hover-focus-visible/button:fill-icon-100
    `,
});