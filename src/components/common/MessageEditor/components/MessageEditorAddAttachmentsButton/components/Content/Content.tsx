import { cn, createStyles, getAnimationVariants, getAssetUrl } from '@/utils';
import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { ReactNode } from 'react';
import { Button, DialogBlocks, Image, Overlay } from '@/components';
import { ASSETS } from '@/generated/ASSETS';
import { createWithDecorator, Heading } from '@lesnoypudge/utils-react';
import { useTrans } from '@/hooks';



const styles = createStyles({
    dialog: 'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
    withoutPointer: 'pointer-events-none',
    container: 'grid h-dvh place-items-center',
    button: 'w-[min(310px,100dvw)] rounded-xl p-2',
    inner: 'flex flex-col rounded-md border-2 border-dashed border-white',
    imageWrapper: 'relative h-9 w-24 self-center',
    image: `
        absolute 
        bottom-0 
        w-[74px] 
        -translate-x-1/2 
        shadow-elevation-medium
    `,
    firstImage: 'left-0 rotate-[-30deg]',
    secondImage: 'left-1/2 z-10 -translate-y-3',
    thirdImage: 'left-full rotate-[30deg]',
    contentWrapper: 'px-2 pb-6 pt-6 text-center text-white',
    heading: 'mb-1.5 text-xl font-bold',
    text: 'text-xs',
});

const { animationVariants } = getAnimationVariants.baseDialog();

type DecoratorProps = (
    Pick<
        Overlay.Dialog.Types.Provider.Props,
        'label' | 'controls'
    >
    & {
        withoutPointerEvents?: boolean;
    }
);

const { withDecorator } = createWithDecorator<DecoratorProps>(({
    controls,
    label,
    withoutPointerEvents,
    children,
}) => {
    return (
        <Overlay.Dialog.Provider
            label={label}
            controls={controls}
            withBackdrop
            withoutPointerEvents={withoutPointerEvents}
            animationVariants={animationVariants}
        >
            <Overlay.Dialog.Wrapper className={styles.dialog}>
                {children}
            </Overlay.Dialog.Wrapper>
        </Overlay.Dialog.Provider>
    );
});

export namespace Content {
    export type Props = (
        RT.PropsWithClassName
        & Pick<DecoratorProps, 'withoutPointerEvents'>
        & {
            header: ReactNode;
            content: ReactNode;
        }
    );
}

export const Content = withDecorator<Content.Props>(({
    className = '',
    withoutPointerEvents,
    content,
    header,
}) => {
    const { t } = useTrans();
    const { closeOverlay } = DialogBlocks.useContextProxy();

    return (
        <Button
            className={cn(
                styles.button,
                withoutPointerEvents && styles.withoutPointer,
                className,
            )}
            label={t('COMMON.Close')}
            onLeftClick={closeOverlay}
        >
            <div className={styles.inner}>
                <div className={styles.imageWrapper}>
                    <Image
                        className={cn(styles.image, styles.firstImage)}
                        src={getAssetUrl(ASSETS.IMAGES.COMMON.FILE_TEXT_IMAGE)}
                    />

                    <Image
                        className={cn(styles.image, styles.secondImage)}
                        src={getAssetUrl(ASSETS.IMAGES.COMMON.FILE_IMAGE_IMAGE)}
                    />

                    <Image
                        className={cn(styles.image, styles.thirdImage)}
                        src={getAssetUrl(ASSETS.IMAGES.COMMON.FILE_CODE_IMAGE)}
                    />
                </div>

                <div className={styles.contentWrapper}>
                    <Heading.Node className={styles.heading}>
                        {header}
                    </Heading.Node>

                    <Heading.Provider>
                        <p className={styles.text}>
                            {content}
                        </p>
                    </Heading.Provider>
                </div>
            </div>
        </Button>
    );
});