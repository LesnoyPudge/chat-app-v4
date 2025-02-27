import { FC } from 'react';
import { Image } from '@components';
import { useTrans } from '@hooks';
import { useBoolean } from '@lesnoypudge/utils-react';
import { getReadImagePath } from '../../utils';
import { cn } from '@utils';
import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { sharedStyles } from '../../vars';



export namespace BaseAvatar {
    export type Props = (
        RT.PropsWithClassName
        & {
            id: string | null | undefined;
        }
    );
}

export const BaseAvatar: FC<BaseAvatar.Props> = ({
    className = '',
    id,
}) => {
    const { t } = useTrans();
    const isLoadedState = useBoolean(false);

    const src = getReadImagePath(id);

    return (
        <div className={cn(
            sharedStyles.wrapper.base,
            !isLoadedState.value && sharedStyles.wrapper.notLoaded,
            className,
        )}>
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
        </div>
    );
};