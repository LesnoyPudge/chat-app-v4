import { ClientEntities } from '@/types';



export const recalculatePermissions = ({
    userId,
    ownerId,
    originalPermissions,
}: {
    userId: string;
    ownerId: string;
    originalPermissions: ClientEntities.Role.Permissions;
}): ClientEntities.Role.Permissions => {
    const op = originalPermissions;

    const shouldPass = op.admin || userId === ownerId;

    return {
        admin: shouldPass,
        banMember: shouldPass || op.banMember,
        channelControl: shouldPass || op.serverControl || op.channelControl,
        createInvitation: shouldPass || op.serverControl || op.createInvitation,
        kickMember: shouldPass || op.serverControl || op.kickMember,
        serverControl: shouldPass || op.serverControl,
    };
};