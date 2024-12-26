import { Endpoints } from '@fakeShared';
import { createApi } from '@reduxjs/toolkit/query/react';
import { createCustomQuery } from '@redux/utils';



// import Message = Endpoints.V1.Message;

export const TextChatsApi = createApi({
    baseQuery: createCustomQuery(),
    reducerPath: 'TextChatsApi',
    tagTypes: ['TextChats'],
    endpoints: (build) => ({}),
});