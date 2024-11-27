// import { Button, Image } from '@lesnoypudge/utils-react';
import { createStyles, getAssetUrl } from '@utils';
import { FC } from 'react';



const styles = createStyles({
    page: `
        flex 
        flex-col 
        items-center 
        justify-center 
        overflow-y-auto 
        bg-primary-300
        text-center 
        text-color-base
        screen 
    `,
    bg: 'image-bg-fullscreen',
    image: 'aspect-[254/154] w-[min(254px,100%)]',
    heading: 'mt-5 text-xl font-semibold text-color-primary',
    text: 'mt-3 text-color-muted',
    button: 'mt-6 font-semibold',
});

export const ErrorScreen: FC = () => {
    return (
        <div className={styles.page}>
            <img
                className={styles.bg}
                src={getAssetUrl('ERROR_BOUNDARY_BG.svg')}
                alt=''
            />
            {/* <Image
                className={styles.bg}
                src={IMAGES.COMMON.ERROR_BOUNDARY_BG.PATH}
            />

            <Image
                className={styles.image}
                src={IMAGES.COMMON.ERROR_BOUNDARY_IMAGE.PATH}
            />

            <Heading className={styles.heading}>
                <>Как-то неловко получается</>
            </Heading> */}

            <div className={styles.text}>
                <p>В приложении возник неожиданный сбой....</p>

                <p>Мы отследили ошибку и вскоре ей займёмся.</p>
            </div>

            {/* <Button
                className={styles.button}
                size='big'
                stylingPreset='brand'
                onLeftClick={onReload}
            >
                <>Перезагрузить</>
            </Button> */}
        </div>
    );
};