import type { RootState } from '@/redux/store';
import { Dispatch, Middleware, MiddlewareAPI } from '@reduxjs/toolkit';



// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type TypedMiddleware = Middleware<{}, RootState>;

type TypedApi = MiddlewareAPI<Dispatch, RootState>;

type Props = {
    api: TypedApi;
    next: (action: unknown) => unknown;
    action: unknown;
};

export const createCustomMiddleware = (
    fn: (props: Props) => unknown,
): TypedMiddleware => {
    return (api) => (next) => (action) => {
        return fn({ api, next, action });
    };
};