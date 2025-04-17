import { FC } from 'react';
import { useMessageContext } from '../../../../hooks';
import { Store } from '@/features';
import { Placeholder } from '@/components';
import { RT } from '@lesnoypudge/types-utils-react/namespace';



export const MessageUsername: FC<RT.PropsWithClassName> = ({
    className = '',
}) => {
    const { usernameId, message } = useMessageContext();

    const name = Store.useSelector(
        Store.Users.Selectors.selectNameById(message.author),
    );

    return (
        <div className={className} id={usernameId}>
            <Placeholder.With reveal={name}>
                {name}
            </Placeholder.With>
        </div>
    );
};