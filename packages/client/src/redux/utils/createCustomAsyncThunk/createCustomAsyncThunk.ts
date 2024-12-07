import type { AppDispatch, RootState } from '@redux/store';
import { createAsyncThunk, CreateAsyncThunkFunction } from '@reduxjs/toolkit';



export const createCustomAsyncThunk = (
    createAsyncThunk.withTypes()
) as CreateAsyncThunkFunction<{
    state: RootState;
    dispatch: AppDispatch;
}>;