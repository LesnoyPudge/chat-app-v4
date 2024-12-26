import { Endpoints } from '@fakeShared';
import { createApi } from '@reduxjs/toolkit/query/react';
import { createCustomQuery } from '@redux/utils';



// import Message = Endpoints.V1.Message;

export const VoiceChatsApi = createApi({
    baseQuery: createCustomQuery(),
    reducerPath: 'VoiceChatsApi',
    tagTypes: ['VoiceChats'],
    endpoints: (build) => ({}),
});