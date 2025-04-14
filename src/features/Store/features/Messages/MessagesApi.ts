import { Endpoints } from '@/fakeShared';
import { getRootApi } from '@/store/utils';
import Message = Endpoints.V1.Message;



export const MessagesApi = getRootApi().injectEndpoints({
    endpoints: (build) => ({
        [Message.Send.NamedAction]: (
            build.mutation<
                Message.Send.Response,
                Message.Send.RequestBody
            >({
                query: (body) => ({
                    url: Message.Send.Path,
                    method: Message.Send.Method,
                    body,
                }),
            })
        ),
    }),
});