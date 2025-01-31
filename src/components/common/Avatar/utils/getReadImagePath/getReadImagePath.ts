import { Endpoints } from '@fakeShared';
import { env } from '@vars';



export const getReadImagePath = <_Id extends string | undefined | null>(
    id: _Id,
) => {
    if (!id) return id;

    return [
        env._PUBLIC_SERVER_URL,
        `${Endpoints.V1.File.Read.Path}/${id}`,
    ].join('');
};