import { Hidden } from '@components';
import { FC } from 'react';



export const Masks: FC = () => {
    return (
        <Hidden>
            <svg viewBox='0 0 1 1'>
                <mask
                    id='avatar-with-status-mask'
                    maskContentUnits='objectBoundingBox'
                >
                    <circle
                        fill='white'
                        cx='0.5'
                        cy='0.5'
                        r='0.5'
                    />
                    <circle
                        fill='black'
                        cx='0.84375'
                        cy='0.84375'
                        r='0.25'
                    />
                </mask>
            </svg>
        </Hidden>
    );
};