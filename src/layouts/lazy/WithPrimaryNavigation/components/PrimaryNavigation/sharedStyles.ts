import { createStyles } from '@utils';



const styles = createStyles({
    button: {
        base: `
            group/button
            peer
            mx-auto 
            flex
            size-12 
            items-center 
            justify-center 
            rounded-full 
            transition-all
            ease-out
            data-[loading=true]:animate-pulse 
            hover-focus-visible:rounded-2xl
            hover-focus-visible:text-white
        `,
        active: 'rounded-2xl text-white',
    },
    avatar: {
        base: `
            group-hover-focus-visible/button:rounded-2xl
            rounded-full
            transition-all
            ease-out
        `,
        active: 'rounded-2xl',
    },
    actionButton: {
        base: `
            bg-primary-300 
            fill-positive 
            hover-focus-visible:bg-positive 
          hover-focus-visible:fill-white 
        `,
        active: 'bg-positive fill-white',
    },
    brandButton: {
        base: `
            bg-primary-300 
            fill-icon-200 
            hover-focus-visible:bg-brand 
          hover-focus-visible:fill-white 
        `,
        active: 'bg-brand fill-white',
    },
    icon: 'size-7 transition-all ease-out',
});

export const sharedStyles = styles;