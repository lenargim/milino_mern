import { useAppSelector } from './../helpers/helpers';
import {useEffect, useRef} from "react";
import {useFormikContext} from "formik";

export const useAuthUser = () => {
    const user = useAppSelector(state => state.user.user);

    if (!user) {
        throw new Error("useAuthUser должен использоваться только внутри PrivateRoute");
    }

    return user;
};


export function usePrevious<T>(data: T) {
    const prev = useRef<T>()
    useEffect(() => {
        if (data) prev.current = data;
    }, [data])
    return prev.current
}

export function useFormikDefault<T>(
    value: T | null | undefined,
    path: string,
    defaultValue: T
) {
    const {setFieldValue} = useFormikContext();

    useEffect(() => {
        if (value == null) {
            setFieldValue(path, defaultValue);
        }
    }, [value]);
}