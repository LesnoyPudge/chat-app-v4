import { FC } from 'react';
import { Image, Placeholder } from '@components';
import { useTrans } from '@i18n';
import { useBoolean } from '@lesnoypudge/utils-react';
import { getReadImagePath } from '../../utils';
import { cn, createStyles } from '@utils';



const styles = createStyles({
    round: 'rounded-full',
    errorImage: 'opacity-0',
});

export namespace BaseAvatar {
    type ConditionalProps = (
        {
            id: string | null | undefined;
            src?: never;
        }
        | {
            id?: never;
            src: string | null | undefined;
        }
    );

    export type Props = (
        ConditionalProps
        & {
            placeholderClassName?: string;
            avatarClassName?: string;
        }
    );
}

export const BaseAvatar: FC<BaseAvatar.Props> = ({
    avatarClassName = '',
    placeholderClassName = '',
    id,
    src,
}) => {
    const { t } = useTrans();
    const isLoadedState = useBoolean(false);

    const _src = src ?? getReadImagePath(id);

    return (
        <Placeholder.Wrapper
            className={cn(styles.round, placeholderClassName)}
            disable={isLoadedState.value}
        >
            <Image
                className={cn(
                    styles.round,
                    !isLoadedState.value && styles.errorImage,
                    avatarClassName,
                )}
                src={_src}
                alt={t('Avatar.alt')}
                onLoad={isLoadedState.setTrue}
                onError={isLoadedState.setFalse}
            />
        </Placeholder.Wrapper>
    );
};