import { FC, useState } from 'react';
import { MainWrapper } from './components/MainWrapper';
import { Api, Socket } from './tabs';



const tabs = {
    'api': <Api/>,
    'socket': <Socket/>,
};

export const App: FC = () => {
    const [tabName, setTabName] = useState<keyof typeof tabs>('api');

    return (
        <MainWrapper>
            <div className="tab-controls">
                <button onClick={() => setTabName('api')}>
                    <>api</>
                </button>

                <button onClick={() => setTabName('socket')}>
                    <>socket</>
                </button>
            </div>

            <div className="tab-name">
                <>{tabName} tab</>
            </div>

            <div className="tab-wrapper">
                {tabs[tabName]}
            </div>
        </MainWrapper>
    );
};