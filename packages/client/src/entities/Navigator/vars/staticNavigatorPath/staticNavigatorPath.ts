import { params } from '../params';



export const staticNavigatorPath = {
    auth: `/auth`,
    root: `/`,
    invitation: `/invitation/${params.invitationId}`,
} as const;