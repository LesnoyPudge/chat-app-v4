import { Button, Image, Scrollable } from '@components';
import { useTrans } from '@i18n';
import { Heading } from '@lesnoypudge/utils-react';
import { createStyles, getAssetUrl } from '@utils';
import { CUSTOM_STYLES } from '@vars';
import { FC } from 'react';
import { useErrorScreen } from './useErrorScreen';



const styles = createStyles({
    page: CUSTOM_STYLES.SCREEN,
    content: `
        flex 
        min-h-full
        flex-col 
        items-center
        justify-center 
        bg-primary-300
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
        <Scrollable className={styles.page} withOppositeGutter>
            <div className={styles.content}>
                <Image
                    className={styles.bg}
                    src={getAssetUrl('ERROR_BOUNDARY_BG.svg')}
                />

                <Image
                    className={styles.image}
                    src={getAssetUrl('ERROR_BOUNDARY_IMAGE.svg')}
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
    );
};

export const ErrorScreen: FC = () => {
    return (
        <ErrorScreenPure {...useErrorScreen()}/>
    );
};