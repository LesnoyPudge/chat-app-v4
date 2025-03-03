import { t } from '@/features';
import { T } from '@lesnoypudge/types-utils-base/namespace';
import { ClientEntities } from '@/types';



type Props = Pick<
    ClientEntities.User.Base,
    'status' | 'extraStatus'
>;

type Names = T.ValueOf<Props>;

export const getStatusLabel = ({
    extraStatus,
    status,
}: Props): string => {
    const STATUS_LABEL = {
        online: t('STATUS.online'),
        offline: t('STATUS.offline'),
        default: t('STATUS.online'),
        invisible: t('STATUS.offline'),
        afk: t('STATUS.afk'),
        dnd: t('STATUS.dnd'),
    } satisfies Record<Names, string>;

    return (
        status === 'offline'
            ? STATUS_LABEL[status]
            : STATUS_LABEL[extraStatus]
    );
};