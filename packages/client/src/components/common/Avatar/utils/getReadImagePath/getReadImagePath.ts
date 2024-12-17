import { Endpoints } from '@fakeShared';
import { toOneLine } from '@utils';
import { env } from '@vars';



export const getReadImagePath = <_Id extends string | undefined | null>(
    id: _Id,
) => {
    if (!id) return id;

    return toOneLine(`
        ${env._PUBLIC_SERVER_URL}
        ${Endpoints.V1.File.Read.Path}/${id}
    ` as const);
};