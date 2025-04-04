import { Button, Scrollable } from '@/components';
import { createSleep, lazyLoad, useBoolean } from '_@lesnoypudge/utils-react';
import { FC, PropsWithChildren, Suspense, useEffect } from 'react';
import { ChatPageTemplate } from '@/router/templates';


const Header: FC = () => {
    const { toggle } = ChatPageTemplate.useChatPageTemplate();

    return (
        <div>top bar <button onClick={toggle}>toggle</button></div>
    );
};

export const TMP: FC = () => {
    return (
        <ChatPageTemplate.Node
            header={<Header/>}
            main={(
                <div className='size-full'>
                    <div>feed</div>
                    <div>message input</div>
                </div>
            )}
            extra={<div>member list</div>}
        />
    );

    // return (
    //     <div className='flex flex-col gap-2'>
    //         <div className='text-center'>wow</div>

    //         <Scrollable>
    //             <div className='flex flex-col gap-2'>
    //             </div>
    //         </Scrollable>
    //     </div>
    // );
};