import { useValidatedParams } from '@/hooks';
import { useFunction } from '@lesnoypudge/utils-react';
import { Features } from '@/redux/features';



export const useInvitationScreen = () => {
    const { invitationCode } = useValidatedParams('invitation');
    const [accept] = Features.Servers.Api.useAcceptInvitationMutation();
    const { data } = Features.Servers.Api.useGetByInvitationCodeQuery({
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