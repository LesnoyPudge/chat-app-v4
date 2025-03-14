import { Button, Image, Scrollable } from '@/components';
import { useTrans } from '@/hooks';
import { Heading } from '@lesnoypudge/utils-react';
import { createStyles, getAssetUrl } from '@/utils';
import { CUSTOM_STYLES } from '@/vars';
import { FC } from 'react';
import { useErrorScreen } from './useErrorScreen';
import { Screen } from '@/router/layouts/bundled';
import { ASSETS } from '@/generated/ASSETS';



const styles = createStyles({
    screen: `bg-primary-300`,
    scrollable: 'h-full',
    content: `
        flex 
        min-h-full
        flex-col 
        items-center
        justify-center 
        py-5
        text-center
        text-color-base
    `,
    bg: CUSTOM_STYLES.IMAGE_BG_FULLSCREEN,
    image: 'aspect-[254/154] w-[min(254px,100%)]',
    heading: 'mt-5 text-xl font-semibold text-color-primary',
    text: 'mt-3 max-w-[360px] text-color-muted',
    button: 'mt-6 font-semibold',
});

export namespace ErrorScreenPure {
    export type Props = ReturnType<typeof useErrorScreen>;
}

export const ErrorScreenPure: FC<ErrorScreenPure.Props> = ({
    onClick,
}) => {
    const { t } = useTrans();

    return (
        <Screen className={styles.screen}>
            <Image
                className={styles.bg}
                src={getAssetUrl(ASSETS.IMAGES.COMMON.ERROR_BOUNDARY_BG)}
            />

            <Scrollable className={styles.scrollable}>
                <div className={styles.content}>
                    <Image
                        className={styles.image}
                        src={getAssetUrl(ASSETS.IMAGES.COMMON.ERROR_BOUNDARY_IMAGE)}
                    />

                    <Heading.Node className={styles.heading}>
                        {t('ErrorScreen.heading')}
                    </Heading.Node>

                    <p className={styles.text}>
                        {t('ErrorScreen.text')}
                    </p>

                    <Button
                        className={styles.button}
                        size='big'
                        stylingPreset='brand'
                        onLeftClick={onClick}
                    >
                        {t('ErrorScreen.button')}
                    </Button>
                </div>
            </Scrollable>
        </Screen>
    );
};

export const ErrorScreen: FC = () => {
    return (
        <ErrorScreenPure {...useErrorScreen()}/>
    );
};