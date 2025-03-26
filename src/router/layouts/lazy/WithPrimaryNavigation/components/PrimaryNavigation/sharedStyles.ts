import { createStyles } from '@/utils';



const styles = createStyles({
    button: `
        group/button
        peer
        flex
        size-12 
        items-center 
        justify-center 
        rounded-full 
        transition-all
        ease-out
        data-[loading=true]:animate-placeholder 
        data-[active=true]:rounded-2xl
        data-[active=true]:text-white
        hover-focus-visible:rounded-2xl 
        hover-focus-visible:text-white
    `,
    avatar: {
        base: `
            rounded-full
            transition-all
            ease-out
            group-hover-focus-visible/button:rounded-2xl
        `,
        active: 'rounded-2xl',
    },
    actionButton: `
        bg-primary-300 
        fill-positive 
        data-[active=true]:bg-positive 
        data-[active=true]:fill-white 
        hover-focus-visible:bg-positive
        hover-focus-visible:fill-white
    `,
    brandButton: `
        bg-primary-300 
        fill-icon-200 
        data-[active=true]:bg-brand 
        data-[active=true]:fill-white 
        hover-focus-visible:bg-brand
        hover-focus-visible:fill-white
    `,
    icon: 'size-7 transition-all ease-out',
});

export const sharedStyles = styles;