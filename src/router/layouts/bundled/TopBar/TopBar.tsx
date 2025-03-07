import { PropsWithChildrenAndClassName } from '@lesnoypudge/types-utils-react';
import { cn, createStyles } from '@/utils';
import { FC } from 'react';
import { MobileMenuButton } from './components';



const styles = createStyles({
    wrapper: `
        flex 
        h-12 
        max-h-12 
        shrink-0 
        items-center 
        shadow-elevation-low
    `,
});

export namespace TopBar {
    export type Props = (
        PropsWithChildrenAndClassName
        & {
            withMobileButton?: boolean;
        }
    );
}

export const TopBar: FC<TopBar.Props> = ({
    className = '',
    withMobileButton = false,
    children,
}) => {
    return (
        <div className={cn(styles.wrapper, className)}>
            <If condition={withMobileButton}>
                <MobileMenuButton/>
            </If>

            {children}
        </div>
    );
};