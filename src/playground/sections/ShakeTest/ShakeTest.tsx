import { Button, Scrollable } from '@/components';
import { Motion } from '@/libs';
import { FC } from 'react';
import {
    useShake,
} from 'src/components/common/DialogBlocks/blockVariants/FullScreenDialogBlocks/components/FullScreenDialogBlocksProvider/hooks';



export const ShakeTest: FC = () => {
    const shake = useShake();

    return (
        <div className='relative flex size-full flex-col gap-2'>
            <Button
                className='text-center'
                onLeftClick={shake.triggerScreenShake}
            >
                <>trigger</>
            </Button>

            <div>
                <>isShaking: {String(shake.isShaking)}</>
            </div>

            <div>
                <span>shakeX:</span>
                <Motion.span>{shake.shakeX}</Motion.span>
            </div>

            <div>
                <span>shakeY:</span>
                <Motion.span>{shake.shakeY}</Motion.span>
            </div>

            <Motion.div
                className={`
                    absolute 
                    left-1/2 
                    top-1/2 
                    bg-black 
                    transition-transform
                    duration-[20ms]
                    ease-linear
                    will-change-transform    
                `}
                style={{
                    translateY: shake.shakeY,
                    translateX: shake.shakeX,
                }}
            >
                <>animated</>
            </Motion.div>
        </div>
    );
};