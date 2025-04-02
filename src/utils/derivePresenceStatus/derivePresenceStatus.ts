import { ClientEntities } from '@/types';



type Props = Pick<
    ClientEntities.User.Base,
    'status' | 'extraStatus'
>;

export const derivePresenceStatus = ({
    extraStatus,
    status,
}: Props): ClientEntities.User.VisibleStatus => {
    return (
        (status === 'offline' || extraStatus === 'invisible')
            ? 'offline'
            : extraStatus === 'default'
                ? 'online'
                : extraStatus
    );
};