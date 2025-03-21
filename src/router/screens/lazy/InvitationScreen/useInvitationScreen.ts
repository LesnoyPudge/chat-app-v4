import { useValidatedParams } from '@/hooks';
import { useFunction } from '@lesnoypudge/utils-react';
import { Store } from '@/features';



export const useInvitationScreen = () => {
    const { invitationCode } = useValidatedParams('invitation');
    const [accept] = Store.Servers.Api.useAcceptInvitationMutation();
    const { data } = Store.Servers.Api.useGetByInvitationCodeQuery({
        invitationCode,
    });

    const acceptInvitation = useFunction(() => {
        void accept({ invitationCode });
    });

    return {
        server: data,
        acceptInvitation,
    };
};