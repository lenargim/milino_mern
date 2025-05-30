import {alertError} from "../api/apiFunctions";
import { AxiosResponse } from 'axios';

export const withRetry = async <T, Args extends any[]>(
    apiCall: (...args: Args) => Promise<AxiosResponse<T>>,
    args: Args,
    fallbackMessage: string,
    thunkAPI: any
): Promise<T | ReturnType<typeof thunkAPI.rejectWithValue>> => {
    try {
        const response = await apiCall(...args);
        return response.data;
    } catch (error) {
        const result = await alertError(error, () => apiCall(...args).then(r => r.data));
        if (result) return result;
        return thunkAPI.rejectWithValue(fallbackMessage);
    }
};
