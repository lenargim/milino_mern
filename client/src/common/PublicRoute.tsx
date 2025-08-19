import {Navigate, Outlet} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../helpers/helpers";
import React, {useEffect} from "react";
import Loading from "./Loading";
import {loadUser} from "../store/reducers/userSlice";

export default function PublicRote() {
    const token = localStorage.getItem('token')
    const user = useAppSelector(state => state.user.user);
    const loading = useAppSelector(state => state.user.loading);
    if (loading) return <Loading />;
    if (user || token) return <Navigate to="/profile" />;
    return <Outlet />;
};
