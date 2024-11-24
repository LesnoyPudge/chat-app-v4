import { Prisma } from '@prisma/client/index-browser';


// <Prisma.UserDefaultArgs>()
const v = Prisma.validator;

class QueryHelpers {
    user = '';

    here = {
        some: this.user,
    };
}


type zxc2 = Prisma.UserGetPayload<{
    include: {
        friends: {
            select: {
                id: true;
                name: true;
                avatarId: true;
            };
        };
    };
    select: {
        id: true;
        name: true;
    };
}>;


export const queryHelpers = new QueryHelpers();