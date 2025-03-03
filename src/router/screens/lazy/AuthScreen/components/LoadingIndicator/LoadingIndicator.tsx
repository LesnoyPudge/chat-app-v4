import { FC } from 'react';
import { cn, createStyles } from '@/utils';
import { RT } from '@lesnoypudge/types-utils-react/namespace';



const styles = createStyles({
    wrapper: 'relative',
    indicatorWrapper: `
        absolute 
        inset-0
        flex 
        items-center 
        justify-center 
        gap-1 
        [&>*:nth-child(2)]:animation-delay-200 
        [&>*:nth-child(3)]:animation-delay-[400ms] 
        [&>*]:h-1.5 
        [&>*]:w-1.5 
        [&>*]:animate-custom-pulse 
        [&>*]:rounded-full
        [&>*]:bg-white
    `,
    child: 'invisible',
});

export namespace WithLoadingIndicator {
    export type Props = (
        RT.PropsWithChildrenAndClassName
        & {
            isLoading: boolean;
        }
    );
}

export const WithLoadingIndicator: FC<WithLoadingIndicator.Props> = ({
    className = '',
    isLoading,
    children,
}) => {
    return (
        <div className={styles.wrapper}>
            <div className={cn(isLoading && styles.child)}>
                {children}
            </div>

            <If condition={isLoading}>
                <div
                    className={cn(styles.indicatorWrapper, className)}
                    aria-label='Loading...'
                    title='Loading...'
                >
                    <div></div>

                    <div></div>

                    <div></div>
                </div>
            </If>
        </div>
    );
};