import { Dialog, Scrollable } from '@components';
import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { cn, createStyles } from '@utils';
import { FC } from 'react';



const styles = createStyles({
    wrapper: 'grid place-items-center',
    inner: `
        pointer-events-auto
        m-auto
        max-h-[90%]
        w-[min(440px,100%)] 
        rounded 
        bg-primary-200 
        shadow-elevation-high
        mobile:max-h-full
    `,
    scrollable: 'flex flex-col justify-between',
});

export namespace BaseModalWrapper {
    export type Props = (
        RT.PropsWithChildrenAndClassName
        & {
            scrollableClassName?: string;
        }
    );
}

export const BaseModalWrapper: FC<BaseModalWrapper.Props> = ({
    className = '',
    scrollableClassName = '',
    children,
}) => {
    return (
        <Dialog.Wrapper className={styles.wrapper}>
            <div className={cn(styles.inner, className)}>
                <Scrollable
                    className={cn(styles.scrollable, scrollableClassName)}
                    size='small'
                    withoutGutter
                >
                    {children}
                </Scrollable>
            </div>
        </Dialog.Wrapper>
    );
};