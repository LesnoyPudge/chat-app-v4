import { Endpoints, sharedValidators } from '@/fakeShared';
import { Valibot } from '@/libs';
import { env } from '@/vars';



const idSchema = sharedValidators.id;

export const getFilePathById = (id: string | null | undefined) => {
    if (!id) return null;

    const idParseResult = Valibot.safeParse(idSchema, id);
    if (idParseResult.success) {
        const id = idParseResult.output;
        const readPath = `${
            env._PUBLIC_SERVER_URL
        }${Endpoints.V1.File.Read.Path}/${id}`;

        return readPath;
    }

    return null;
};