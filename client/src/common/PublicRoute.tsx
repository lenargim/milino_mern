import {Navigate, Outlet} from "react-router-dom";
import {useAppSelector} from "../helpers/helpers";
import React from "react";
import Loading from "./Loading";

export default function PublicRote() {
    const user = useAppSelector(state => state.user.user);
    const loading = useAppSelector(state => state.user.loading);

    if (loading) return <Loading />;
    if (user) return <Navigate to="/profile" />;
    return <Outlet />;
};
