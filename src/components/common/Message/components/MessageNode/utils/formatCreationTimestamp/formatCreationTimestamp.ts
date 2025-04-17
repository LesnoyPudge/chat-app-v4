import { t } from '@/features';
import { isToday, isYesterday, lightFormat } from 'date-fns';



const getTodayFormat = (timestamp: number) => {
    const mark = t('formatCreationTimestamp.today').toString();
    return lightFormat(timestamp, `'${mark}' H:m`);
};

const getYesterdayFormat = (timestamp: number) => {
    const mark = t('formatCreationTimestamp.yesterday').toString(); ;
    return lightFormat(timestamp, `'${mark}' H:m`);
};

export const formatCreationTimestamp = (timestamp: number) => {
    const isCreatedToday = isToday(timestamp);
    const isCreatedYesterday = isYesterday(timestamp);

    const shouldShowRelativeFormat = isCreatedToday || isCreatedYesterday;

    const formattedTimestamp = (
        shouldShowRelativeFormat
            ? isCreatedToday
                ? getTodayFormat(timestamp)
                : getYesterdayFormat(timestamp)
            : lightFormat(timestamp, 'dd.MM.yyyy H:mm')
    );

    return formattedTimestamp;
};