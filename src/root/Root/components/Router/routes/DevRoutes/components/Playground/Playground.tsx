import { Scrollable } from '@components';
import { Screen } from '@layouts/bundled';
import { FC } from 'react';
import * as Sections from './sections';



export const Playground: FC = () => {
    return (
        <div style={{
            height: '100dvh',
            display: 'flex',
            flexDirection: 'column',
        }}>
            <div className='bg-red-900'>
                <>1</>
            </div>

            <div style={{
                overflow: 'auto',
                // maxHeight: '100%',
                // flex: 1,
                minHeight: 0,
            }}>
                <div style={{ minHeight: '9999px' }}>big content</div>
            </div>

            <div className='bg-red-900'>
                <>2</>
            </div>
        </div>
    );

    return (
        <Screen className='flex flex-col'>
            <Scrollable className='flex flex-col gap-2'>
                <Sections.TMP/>

                {/* <Sections.KeyboardNavigation/> */}
            </Scrollable>
        </Screen>
    );
};