import { Message, Scrollable } from '@/components';
import { FC } from 'react';



export const MessageTest: FC = () => {
    const variation = Message.getPlaceholderVariation();

    return (
        <Scrollable>
            <div className='flex flex-col gap-4 p-8'>
                {/* <Message.Placeholder
                    messageDisplayMode='compact'
                    placeholderVariation={variation}
                />

                <Message.Placeholder
                    messageDisplayMode='cozy'
                    placeholderVariation={variation}
                /> */}

                <Message.Node/>
            </div>
        </Scrollable>
    );
};