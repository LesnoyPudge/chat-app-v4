import { createQuery } from '@/store/utils';
import { ReduxToolkitQueryReact } from '@/libs';


// import Message = Endpoints.V1.Message;

export const MessagesApi = ReduxToolkitQueryReact.createApi({
    baseQuery: createQuery(),
    reducerPath: 'MessagesApi',
    tagTypes: ['Messages'],
    endpoints: (build) => ({}),
});