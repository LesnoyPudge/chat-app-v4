import { Endpoints } from '@/fakeShared';
import { env } from '@/vars';



const cache = new Map<string, string>();

export const getReadFilePath = <_Id extends string | undefined | null>(
    id: _Id,
) => {
    if (!id) return id;

    const found = cache.get(id);
    if (found) return found;

    const result = [
        env._PUBLIC_SERVER_URL,
        `${Endpoints.V1.File.Read.Path}/${id}`,
    ].join('');

    cache.set(id, result);

    return result;
};