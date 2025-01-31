import { createStyles } from '@utils';



const styles = createStyles({
    wrapper: {
        base: `
            size-full 
            shrink-0
            overflow-hidden 
            rounded-full
            bg-primary-100
        `,
        notLoaded: 'animate-pulse',
    },
    image: {
        base: 'aspect-square size-full',
        notLoaded: 'sr-only',
    },
});

export const sharedStyles = styles;