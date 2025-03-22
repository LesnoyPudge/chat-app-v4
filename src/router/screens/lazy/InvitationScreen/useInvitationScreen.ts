import { useValidatedParams } from '@/hooks';
import { useFunction } from '@lesnoypudge/utils-react';
import { Store } from '@/features';



export const useInvitationScreen = () => {
    const { invitationCode } = useValidatedParams('invitation');
    const [accept] = Store.Servers.Api.useServerAcceptInvitationMutation();
    const { data } = Store.Servers.Api.useServerGetByInvitationCodeQuery({
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