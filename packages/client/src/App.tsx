import { FC } from 'react';
import { Block } from './components/Block';
import { MainWrapper } from './components/MainWrapper';


export const App: FC = () => {
    return (
        <MainWrapper>
            <Block></Block>
        </MainWrapper>
    );
};