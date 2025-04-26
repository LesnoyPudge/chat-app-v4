import { T } from '@lesnoypudge/types-utils-base/namespace';



export const LoadingState = {
    Uninitialized: 'Uninitialized',
    Success: 'Success',
    Error: 'Error',
    Loading: 'Loading',
} as const;

export type LoadingState = T.ValueOf<typeof LoadingState>;