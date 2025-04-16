import { FC } from 'react';
import { useMessageContext } from '../../../../hooks';
import { Store } from '@/features';
import { Placeholder } from '@/components';



export const MessageUsername: FC = () => {
    const { usernameId, message } = useMessageContext();

    const name = Store.useSelector(
        Store.Users.Selectors.selectNameById(message.author),
    );

    return (
        <div id={usernameId}>
            <Placeholder.With reveal={name}>
                {name}
            </Placeholder.With>
        </div>
    );
};