import { createStyles } from '@utils';



export const styles = createStyles({
    base: `
        flex 
        h-fit 
        w-fit 
        shrink-0 
        items-center 
        justify-center
        rounded-[3px] 
        px-3 
        py-1 
        text-center 
        text-sm 
        decoration-current 
        decoration-2 
        underline-offset-4 
        transition-all 
        duration-100 
        aria-[disabled=true]:cursor-not-allowed
        aria-[disabled=true]:opacity-55 
        data-[loading=true]:animate-pulse
    `,

    sizes: {
        small: 'min-h-[32px] min-w-[60px]',
        medium: 'min-h-[38px] min-w-[96px]',
        big: 'min-h-[44px] min-w-[130px]',
    },

    brand: {
        base: `
            bg-brand 
            font-medium 
            text-white 
            hover:bg-brand-hover 
            focus-visible:bg-brand-hover 
            active:bg-brand-active 
            data-[loading=true]:bg-brand-active
        `,
        active: 'bg-brand-active',
    },

    brandNeutral: {
        base: `
            bg-neutral 
            font-medium 
            text-white 
            hover:bg-neutral-hover 
            focus-visible:bg-neutral-hover 
            active:bg-neutral-active 
            data-[loading=true]:bg-neutral-active
        `,
        active: 'bg-neutral-active',
    },

    brandDanger: {
        base: `
            bg-danger 
            font-medium 
            text-white
            hover:bg-danger-hover 
            focus-visible:bg-danger-hover 
            active:bg-danger-active 
            data-[loading=true]:bg-danger-active
        `,
        active: 'bg-danger-active',
    },

    brandPositive: {
        base: `
            bg-positive 
            font-medium 
            text-white 
            hover:bg-positive-hover 
            focus-visible:bg-positive-hover 
            active:bg-positive-active 
            data-[loading=true]:bg-positive-active
        `,
        active: 'bg-positive-active',
    },

    link: {
        base: `
            p-0 
            text-color-link 
            hover:underline 
            focus-visible:underline
        `,
        active: 'underline',
    },

    lite: {
        base: `
            text-color-primary 
            hover:underline 
            focus-visible:underline
        `,
        active: 'underline',
    },

    invisibleBrand: {
        base: `
            font-medium 
            text-color-secondary 
            hover:bg-brand 
            hover:text-white 
            focus-visible:bg-brand 
            focus-visible:text-white 
            active:bg-brand-active 
            active:text-white 
            data-[loading=true]:bg-brand-active 
            data-[loading=true]:text-white
        `,
        active: 'bg-brand-active text-white',
    },
});