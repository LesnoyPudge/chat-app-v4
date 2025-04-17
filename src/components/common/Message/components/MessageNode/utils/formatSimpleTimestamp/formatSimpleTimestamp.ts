import { lightFormat } from 'date-fns';



export const formatSimpleTimestamp = (timestamp: number) => {
    return lightFormat(timestamp, 'HH:mm');
};