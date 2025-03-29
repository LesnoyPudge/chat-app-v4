import { FC } from 'react';
import { createStyles, getAssetUrl } from '@/utils';
import { useGlobalLoaderScreen } from './useGlobalLoaderScreen';
import { Scrollable } from '@/components';
import { Screen } from '@/router/layouts/bundled';
import { ASSETS } from '@/generated/ASSETS';
import { ProblemBlock } from './components';



const styles = createStyles({
    screen: `pointer-events-auto bg-primary-400`,
    scrollable: 'h-full',
    content: `
        grid 
        min-h-full 
        place-items-center 
        overflow-hidden 
        [grid-template-rows:1fr_auto_1fr]
    `,
    logo: 'row-start-2 size-[min(100%,200px)]',
});

export namespace GlobalLoaderScreenPure {
    export type Props = ReturnType<typeof useGlobalLoaderScreen>;
}

export const GlobalLoaderScreenPure: FC<GlobalLoaderScreenPure.Props> = ({
    showProblemBlock,
}) => {
    return (
        <Screen className={styles.screen}>
            <Scrollable className={styles.scrollable}>
                <div className={styles.content}>
                    <video
                        className={styles.logo}
                        autoPlay
                        loop
                        disablePictureInPicture
                        disableRemotePlayback
                        playsInline
                        muted
                        poster={getAssetUrl(ASSETS.IMAGES.COMMON.ANIMATED_DISCORD_LOGO_PLACEHOLDER)}
                    >
                        <source
                            src={getAssetUrl(ASSETS.VIDEOS.DISCORD_ANIMATED_LOGO)}
                            type='video/webm'
                        />
                    </video>

                    <If condition={showProblemBlock}>
                        <ProblemBlock/>
                    </If>
                </div>
            </Scrollable>
        </Screen>
    );
};

export const GlobalLoaderScreen = () => {
    return (
        <GlobalLoaderScreenPure
            {...useGlobalLoaderScreen()}
        />
    );
};