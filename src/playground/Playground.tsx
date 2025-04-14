import { Screen } from '@/router/layouts/bundled';
import { FC } from 'react';
import * as Sections from './sections';



export const Playground: FC = () => {
    return (
        <Screen className='flex flex-col'>
            {/* <Sections.TMP/> */}
            {/* <Sections.RouterContextRerenders/> */}
            {/* <Sections.MeasureSelectorPerf/> */}
            {/* <Sections.FormTest/> */}
            {/* <Sections.MessageInputBarTest/> */}
            {/* <Sections.FeedTest/> */}
            <Sections.MessageTest/>
        </Screen>
    );
};