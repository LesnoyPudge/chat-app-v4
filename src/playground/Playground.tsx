import { Screen } from '@/router/layouts/bundled';
import { FC } from 'react';
import * as Sections from './sections';



export const Playground: FC = () => {
    return (
        <Screen className='flex flex-col'>
            {/* <Sections.FormTest/> */}
            {/* <Sections.TMP/> */}
            <Sections.MessageInputBarTest/>
            {/* <Sections.RouterContextRerenders/> */}
            {/* <Sections.MeasureSelectorPerf/> */}
        </Screen>
    );
};