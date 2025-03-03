import { Hidden } from '@lesnoypudge/utils-react';
import { MASK_ID } from '@/vars';
import { FC } from 'react';



export const Masks: FC = () => {
    return (
        <Hidden>
            <svg viewBox='0 0 1 1'>
                <mask
                    id={MASK_ID.STATUS_BADGE}
                    maskContentUnits='objectBoundingBox'
                >
                    <rect
                        fill='white'
                        x='0'
                        y='0'
                        width='1'
                        height='1'
                    />

                    <rect
                        fill='black'
                        x={`${19 / 32}`}
                        y={`${19 / 32}`}
                        width={`${16 / 32}`}
                        height={`${16 / 32}`}
                        rx={`${8 / 32}`}
                        ry={`${8 / 32}`}
                    />
                </mask>

                <mask
                    id={MASK_ID.NOTIFICATION_BADGE_BIG}
                    maskContentUnits='objectBoundingBox'
                >
                    <rect
                        fill='white'
                        x='0'
                        y='0'
                        width='1'
                        height='1'
                    />

                    <rect
                        fill='black'
                        x={`${14 / 48}`}
                        y={`${28 / 48}`}
                        width={`${38 / 48}`}
                        height={`${24 / 48}`}
                        rx={`${12 / 48}`}
                        ry={`${12 / 48}`}
                    />
                </mask>

                <mask
                    id={MASK_ID.NOTIFICATION_BADGE_MEDIUM}
                    maskContentUnits='objectBoundingBox'
                >
                    <rect
                        fill='white'
                        x='0'
                        y='0'
                        width='1'
                        height='1'
                    />

                    <rect
                        fill='black'
                        x={`${22 / 48}`}
                        y={`${28 / 48}`}
                        width={`${30 / 48}`}
                        height={`${24 / 48}`}
                        rx={`${12 / 48}`}
                        ry={`${12 / 48}`}
                    />
                </mask>

                <mask
                    id={MASK_ID.NOTIFICATION_BADGE_SMALL}
                    maskContentUnits='objectBoundingBox'
                >
                    <rect
                        fill='white'
                        x='0'
                        y='0'
                        width='1'
                        height='1'
                    />

                    <rect
                        fill='black'
                        x={`${28 / 48}`}
                        y={`${28 / 48}`}
                        width={`${24 / 48}`}
                        height={`${24 / 48}`}
                        rx={`${12 / 48}`}
                        ry={`${12 / 48}`}
                    />
                </mask>
            </svg>
        </Hidden>
    );
};