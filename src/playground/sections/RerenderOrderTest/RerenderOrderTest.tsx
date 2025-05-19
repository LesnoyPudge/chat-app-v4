import { Scrollable } from '@/components';
import { Store } from '@/features';
import { useFunction } from '@lesnoypudge/utils-react';
import { FC, PropsWithChildren } from 'react';



const Inner: FC = () => {
    const isMuted = Store.useSelector(
        Store.App.Selectors.selectIsMute,
    );

    console.log('Inner', { isMuted });

    return <div>qwe</div>;
};

const Wrapper: FC<PropsWithChildren> = ({ children }) => {
    const isMuted = Store.useSelector(
        Store.App.Selectors.selectIsMute,
    );

    console.log('Wrapper', { isMuted });

    if (isMuted) return (
        <div>MUTED</div>
    );

    return (
        <div>
            <div>zxc</div>

            {children}
        </div>
    );
};


export const RerenderOrderTest: FC = () => {
    const { setIsMute } = Store.useActions(Store.App);
    const isMuted = Store.useSelector(
        Store.App.Selectors.selectIsMute,
    );

    const toggle = useFunction(() => {
        setIsMute(!isMuted);
    });

    return (
        <div className='flex flex-col gap-2'>
            <div className='text-center'>wow</div>

            <button onClick={toggle}>toggle</button>

            <Wrapper>
                <Inner/>
            </Wrapper>

            <Scrollable>
                <div className='flex flex-col gap-2'>
                </div>
            </Scrollable>
        </div>
    );
};