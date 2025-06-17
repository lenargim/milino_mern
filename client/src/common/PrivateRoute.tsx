import React, { useEffect } from 'react';
import {Navigate, Outlet, useLocation} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from "../helpers/helpers";
import {loadUser, UserState} from "../store/reducers/userSlice";
import Loading from "./Loading";

const PrivateRoute = () => {
    const dispatch = useAppDispatch();
    const {user, loading} = useAppSelector<UserState>(state => state.user);
    const token = localStorage.getItem('token')
    useEffect(() => {
        dispatch(loadUser());
    }, [dispatch]);

    if (!token) return <Navigate to="/" />;
    if (loading) return <Loading />;
    if (!user) return null;
    return <Outlet />;
};

export default PrivateRoute;
