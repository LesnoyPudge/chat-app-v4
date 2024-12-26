import { Endpoints } from '@fakeShared';
import { createApi } from '@reduxjs/toolkit/query/react';
import { createCustomQuery } from '@redux/utils';



// import Message = Endpoints.V1.Message;

export const ConversationsApi = createApi({
    baseQuery: createCustomQuery(),
    reducerPath: 'ConversationsApi',
    tagTypes: ['Conversations'],
    endpoints: (build) => ({}),
});