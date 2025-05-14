import { Button, Image, MobileMenu, Scrollable } from '@/components';
import { ASSETS } from '@/generated/ASSETS';
import { useTrans } from '@/hooks';
import { createStyles } from '@/utils';
import { Heading } from '@lesnoypudge/utils-react';
import { FC } from 'react';



const styles = createStyles({
    scrollable: 'h-full',
    wrapper: 'grid h-full place-items-center',
    inner: `
        flex
        max-w-[440px] 
        flex-col 
        items-center 
        justify-center 
        gap-10 
        py-4
    `,
    image: 'w-[min(272px,100%)]',
    text: 'text-center text-color-secondary',
    heading: 'mb-2 text-17-22 font-semibold uppercase',
});

export const ChannelFinderPanel: FC = () => {
    const { t } = useTrans();
    const { openMenu, isMobile } = MobileMenu.useMobileMenu();

    return (
        <Scrollable className={styles.scrollable}>
            <div className={styles.wrapper}>
                <div className={styles.inner}>
                    <Image
                        className={styles.image}
                        pointer={ASSETS.IMAGES.COMMON.ROOMS_NOT_FOUND}
                    />

                    <div className={styles.text}>
                        <Heading.Node className={styles.heading}>
                            {t('ChannelFinderPanel.heading')}
                            <></>
                        </Heading.Node>

                        <p>{t('ChannelFinderPanel.strangePlace')}</p>

                        <p>{t('ChannelFinderPanel.explanation')}</p>
                    </div>

                    <If condition={isMobile}>
                        <Button
                            size='medium'
                            stylingPreset='brand'
                            onLeftClick={openMenu}
                        >
                            {t('ChannelFinderPanel.openMobileMenu')}
                        </Button>
                    </If>
                </div>
            </div>
        </Scrollable>
    );
};