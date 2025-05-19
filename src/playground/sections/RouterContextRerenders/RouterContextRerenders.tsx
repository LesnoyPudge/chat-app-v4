import { Navigator } from '@/features';
import { FC } from 'react';



export const RouterContextRerenders: FC = () => {
    return (
        <Navigator.Provider>
            <Inner/>
        </Navigator.Provider>
    );
};

const Inner = () => {
    const { navigateToDev } = Navigator.useNavigateTo();

    return (
        <div>
            <div>
                <>wow</>
            </div>

            <button onClick={navigateToDev.playground}>
                <>nav {Math.random()}</>
            </button>
        </div>
    );
};