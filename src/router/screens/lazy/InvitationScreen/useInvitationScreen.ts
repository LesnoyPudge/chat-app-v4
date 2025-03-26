import { useFunction } from '@lesnoypudge/utils-react';
import { Navigator, Store } from '@/features';



export const useInvitationScreen = () => {
    const { invitationCode } = Navigator.useParams('invitation');
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