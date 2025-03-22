import { ReduxToolkitQueryReact } from '@/libs';
import { createQuery } from '@/store/utils';
import { ENTITY_NAME } from '@/fakeShared';



const rootApi = ReduxToolkitQueryReact.createApi({
    baseQuery: createQuery(),
    tagTypes: Object.values(ENTITY_NAME),
    endpoints: () => ({}),
});

export const getRootApi = () => {
    return rootApi;
};