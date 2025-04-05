import { Store } from '@/features';



export const useIsCurrentUser = (userId: string) => {
    const currentUserId = Store.useSelector(
        Store.Users.Selectors.selectCurrentUserId,
    );

    const isCurrentUser = currentUserId === userId;

    return {
        isCurrentUser,
    };
};