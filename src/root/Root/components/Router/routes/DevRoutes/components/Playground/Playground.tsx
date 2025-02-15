import { Scrollable } from '@components';
import { Screen } from '@layouts/bundled';
import { FC } from 'react';
import * as Sections from './sections';



export const Playground: FC = () => {
    return (
        <div style={{ height: '100dvh' }}>
            <div
                className='bg-red-800'
                style={{
                    // minHeight: 0,
                }}>
                <>1</>
            </div>

            <div className=''>
                <div>test 1</div>

                <div style={{
                // minHeight: 0,
                }}>
                    {/* <div
                        className='scrollable'
                        style={{
                            overflow: 'auto',
                            maxHeight: '100%',
                            // minHeight: 0,
                            // flexGrow: 1,
                            // flexShrink: 1,
                        }}
                    > */}
                    <Scrollable>
                        <div style={{ minHeight: '9999px' }}>2</div>
                    </Scrollable>
                    {/* </div> */}
                </div>

                <div>test 2</div>
            </div>

            <div className='bg-red-800'>
                <>3</>
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