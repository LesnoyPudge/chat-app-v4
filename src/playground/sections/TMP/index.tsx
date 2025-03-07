import { Scrollable } from '@/components';
import { FC } from 'react';



export const TMP: FC = () => {
    return (
        <div className='flex h-dvh flex-col gap-4'>
            <Scrollable
                className='h-full'
                direction='both'
                withOppositeGutter
            >
                <div className='flex gap-2'>
                    {Array.from({ length: 200 }).map((_, index) => {
                        return (
                            <div key={index}>{index}</div>
                        );
                    })}
                </div>
            </Scrollable>
        </div>
    );
};