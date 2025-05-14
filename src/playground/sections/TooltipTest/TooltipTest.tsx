import { Button, Overlay } from '@/components';
import { useRefManager } from '@lesnoypudge/utils-react';
import { FC } from 'react';



export const TooltipTest: FC = () => {
    const buttonRef = useRefManager<HTMLButtonElement>(null);

    return (
        <div className='size-full'>
            <Button innerRef={buttonRef}>
                some
            </Button>

            <Overlay.Tooltip
                leaderElementRef={buttonRef}
                preferredAlignment='left'
            >
                <>tooltip</>
            </Overlay.Tooltip>
        </div>
    );
};