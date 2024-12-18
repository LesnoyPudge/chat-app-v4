import { ClientEntities } from '@types';
import { STATUS_LABEL } from '@vars';



type Props = Pick<
    ClientEntities.User.Base,
    'status' | 'extraStatus'
>;

export const getStatusLabel = ({
    extraStatus,
    status,
}: Props): string => {
    return (
        status === 'offline'
            ? STATUS_LABEL[status]
            : STATUS_LABEL[extraStatus]
    );
};