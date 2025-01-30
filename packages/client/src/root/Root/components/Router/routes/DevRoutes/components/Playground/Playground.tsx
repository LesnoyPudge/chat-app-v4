import { Scrollable } from '@components';
import { Screen } from '@layouts/bundled';
import { FC } from 'react';
import * as Sections from './sections';



export const Playground: FC = () => {
    return (
        <Screen className='flex flex-col'>
            <Scrollable className='flex flex-col gap-2'>
                <Sections.TMP/>

                {/* <Sections.KeyboardNavigation/> */}
            </Scrollable>
        </Screen>
    );
};