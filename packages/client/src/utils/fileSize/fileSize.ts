


const STEP = 1_024;

export const MBToBytes = (MB: number) => {
    return MB * STEP * STEP;
};

export const KBToBytes = (KB: number) => {
    return KB * STEP;
};