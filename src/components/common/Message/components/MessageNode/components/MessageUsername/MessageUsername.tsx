import { FC } from 'react';
import { useMessageContext } from '../../../../hooks';
import { Store } from '@/features';
import { Placeholder } from '@/components';
import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { cn, createStyles } from '@/utils';



const styles = createStyles({
    wrapper: `
        inline
        shrink-0
        font-medium 
        leading-none 
        text-color-primary
    `,
    placeholder: 'inline-block w-20',
});

export namespace MessageUsername {
    export type Props = (
        RT.PropsWithClassName
        & {
            postfix?: string;
        }
    );
}

export const MessageUsername: FC<MessageUsername.Props> = ({
    className = '',
    postfix,
}) => {
    const { usernameId, message } = useMessageContext();

    const name = Store.useSelector(
        Store.Users.Selectors.selectNameById(message.author),
    );

    return (
        <div className={cn(styles.wrapper, className)} id={usernameId}>
            <Placeholder.With className={styles.placeholder} reveal={name}>
                <span>{name}</span>
            </Placeholder.With>

            <If condition={!!postfix}>
                <span>{postfix}</span>
            </If>
        </div>
    );
};