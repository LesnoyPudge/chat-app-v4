import { createStyles } from '@utils';



const styles = createStyles({
    wrapper: `
        size-full 
        shrink-0 
        animate-pulse 
        overflow-hidden 
        rounded-full
        bg-primary-100
    `,
    image: {
        base: 'aspect-square size-full',
        notLoaded: 'sr-only',
    },
});

export const sharedStyles = styles;