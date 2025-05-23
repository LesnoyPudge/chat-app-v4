import { Image } from '@/components';
import { ASSETS } from '@/generated/ASSETS';
import { createStyles } from '@/utils';
import { FC } from 'react';
import { ContextSelectable } from '@lesnoypudge/utils-react';
import { useTrans } from '@/hooks';
import { ContentContext } from '../../ContentContext';



const styles = createStyles({
    notFoundWrapper: 'mx-auto w-full max-w-[420px] py-4',
    notFoundImage: 'max-h-[220px]',
    notFoundText: 'mt-10 text-center text-color-secondary',
});

export const EmptyListBlock: FC = () => {
    const { t } = useTrans();
    const {
        shouldShowEmptyBlock,
        searchValue,
    } = ContextSelectable.useProxy(ContentContext);

    if (!shouldShowEmptyBlock) return null;

    const isSearchEmpty = !searchValue;

    return (
        <div className={styles.notFoundWrapper}>
            <Image
                className={styles.notFoundImage}
                pointer={ASSETS.IMAGES.COMMON.FRIENDSNOTFOUND}
            />

            <div className={styles.notFoundText}>
                <If condition={isSearchEmpty}>
                    {t('FriendsPanel.EmptyListBlock.noSearch')}
                </If>

                <If condition={!isSearchEmpty}>
                    {t('FriendsPanel.EmptyListBlock.notFound')}
                </If>
            </div>
        </div>
    );
};