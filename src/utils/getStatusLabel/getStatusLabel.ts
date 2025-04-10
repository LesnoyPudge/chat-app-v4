import { t } from '@/features';
import { ClientEntities } from '@/types';
import { derivePresenceStatus } from '@/utils';



type Props = Pick<
    ClientEntities.User.Base,
    'status' | 'extraStatus'
>;

const STATUS_LABEL = {
    online: t('STATUS.online'),
    offline: t('STATUS.offline'),
    afk: t('STATUS.afk'),
    dnd: t('STATUS.dnd'),
} satisfies Record<ClientEntities.User.VisibleStatus, ReturnType<t>>;

export const getStatusLabel = (props: Props): string => {
    return STATUS_LABEL[derivePresenceStatus(props)].toString();
};