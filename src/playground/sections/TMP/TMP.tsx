import { Scrollable } from '@/components';
import { FC } from 'react';



export const TMP: FC = () => {
    return (
        <div className='flex flex-col gap-2'>
            <div className='text-center'>wow</div>

            <Scrollable>
                <div className='flex flex-col gap-2'>
                </div>
            </Scrollable>
        </div>
    );
};