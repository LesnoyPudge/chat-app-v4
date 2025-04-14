import { MessageEditor } from '@/components';
import { FC } from 'react';



export const MessageInputBarTest: FC = () => {
    return (
        <div className='flex flex-col gap-4'>
            <div>wow</div>

            <MessageEditor.Presets.Disabled>
                <>disabled</>
            </MessageEditor.Presets.Disabled>

            <MessageEditor.Presets.Placeholder/>

            <MessageEditor.Presets.SendMessageInput textChatId=''/>
        </div>
    );
};