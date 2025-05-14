import { ClientEntities } from '@/types';
import { FC } from 'react';
import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { Image } from '@/components';
import { cn, resolveImagePath, createStyles } from '@/utils';
import { useTrans } from '@/hooks';
import { useBoolean } from '@lesnoypudge/utils-react';
import { sharedStyles } from '../../vars';



const styles = createStyles({
    wrapper: {
        base: 'relative @container',
        loaded: 'animate-none',
    },
    name: `
        absolute
        left-1/2
        top-1/2
        max-w-full
        -translate-x-1/2
        -translate-y-1/2 
        select-none 
        truncate 
        px-1.5
        text-[35cqw]
        font-medium 
        uppercase 
        leading-none
    `,
});

const formatName = (name: string | undefined) => {
    if (!name) return null;

    return name.split(' ').map((word) => word.charAt(0)).join('');
};

export namespace ServerAvatar {
    export type Props = (
        RT.PropsWithClassName
        & Partial<Pick<
            ClientEntities.Server.Base,
            'name'
        >>
        & {
            avatar: resolveImagePath.ImagePointer;
        }
    );
}

export const ServerAvatar: FC<ServerAvatar.Props> = ({
    className = '',
    avatar,
    name,
}) => {
    const { t } = useTrans();
    const isLoadedState = useBoolean(false);

    const src = resolveImagePath(avatar);

    const showImage = !!src;
    const showName = !showImage && !!name;
    const showPlaceholder = !isLoadedState.value && !showName;

    const formattedName = formatName(name);

    return (
        <div className={cn(
            sharedStyles.wrapper.base,
            showPlaceholder && sharedStyles.wrapper.notLoaded,
            styles.wrapper.base,
            showName && styles.wrapper.loaded,
            className,
        )}>
            <If condition={showImage}>
                <Image
                    className={cn(
                        sharedStyles.image.base,
                        !isLoadedState.value && sharedStyles.image.notLoaded,
                    )}
                    src={src}
                    alt={t('Avatar.alt')}
                    onLoad={isLoadedState.setTrue}
                    onError={isLoadedState.setFalse}
                />
            </If>

            <If condition={showName}>
                <div className={styles.name}>
                    {formattedName}
                </div>
            </If>
        </div>
    );
};