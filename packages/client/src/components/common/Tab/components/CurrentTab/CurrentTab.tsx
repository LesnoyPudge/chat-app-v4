import { useContextSelector } from '@lesnoypudge/utils-react';
import { FC } from 'react';
import { TabContext } from '../../context';



export const CurrentTab: FC = () => {
    const currentTab = useContextSelector(TabContext, (v) => v.currentTab);

    return currentTab.tab;
};