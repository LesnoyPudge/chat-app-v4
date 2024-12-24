import { createStyles } from '@utils';



const styles = createStyles({
    button: {
        base: `
            peer 
            mx-auto 
            flex 
            h-12 
            w-12 
            items-center 
            justify-center 
            overflow-hidden 
            rounded-3xl 
            bg-primary-300 
            transition-all 
            duration-75
            ease-linear 
            data-[loading=true]:animate-pulse
            hover-focus-visible:rounded-2xl
            hover-focus-visible:text-white
        `,
        active: 'rounded-2xl text-white',
    },
    actionButton: {
        base: `
            fill-positive 
            hover-focus-visible:bg-positive 
          hover-focus-visible:fill-white 
        `,
        active: 'bg-positive fill-white',
    },
    brandButton: {
        base: `
            fill-icon-200 
            hover-focus-visible:bg-brand 
          hover-focus-visible:fill-white 
        `,
        active: 'bg-brand fill-white',
    },
    icon: 'h-7 w-7 transition-all duration-75 ease-linear',
});

export const sharedStyles = styles;