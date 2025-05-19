import { Scrollable } from '@/components';
import { Store } from '@/features';
import { If } from '@lesnoypudge/react-if';
import { FC, useEffect } from 'react';



export const MutationDebug: FC = () => {
    const [
        trigger,
        { isLoading },
    ] = Store.Servers.Api.useServerLeaveMutation();

    useEffect(() => {
        const fn = async () => {
            await trigger({ serverId: '' }).then(({ error }) => {
                console.log('then', error);
            });
            console.log('after');
        };

        void fn();
    }, [trigger]);

    return (
        <div className='flex flex-col gap-2'>
            <div className='text-center'>
                {isLoading ? 'loading' : 'idle'}
            </div>
        </div>
    );
};