import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import {useAppDispatch, useAppSelector} from "../helpers/helpers";
import {loadUser} from "../store/reducers/userSlice";
import Loading from "./Loading";

const PrivateRoute = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.user.user);
    const loading = useAppSelector(state => state.user.loading);

    useEffect(() => {
        dispatch(loadUser());
    }, [dispatch]);

    if (loading) return <Loading />;
    if (!user) return <Navigate to="/" />;

    return <Outlet />;
};

export default PrivateRoute;
