import axios from "axios";
import {alertError} from "../api/apiFunctions";

export async function withTryCatch<T>(
    fn: () => Promise<{ data: T }>,
    thunkAPI: any
): Promise<T | ReturnType<typeof thunkAPI.rejectWithValue>> {
    try {
        const response = await fn();
        return response.data;
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            const message =
                error.response?.data?.message || error.message || 'Axios error';
            alertError(error)
            return thunkAPI.rejectWithValue(message);
        }
        return thunkAPI.rejectWithValue('Unexpected error');
    }
}

