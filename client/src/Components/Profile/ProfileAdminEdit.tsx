import React, {FC, useEffect} from "react";
import {Navigate, Outlet, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../helpers/helpers";
import {getEditableUser} from "../../store/reducers/adminSlice";
import {AdminUsersRes} from "../../api/apiTypes";
import Loading from "../../common/Loading";
import s from './profile.module.sass'

const ProfileAdminEdit: FC = () => {
    const dispatch = useAppDispatch();
    const {loading, editable_user} = useAppSelector<AdminUsersRes>(state => state.admin);
    const {user_id} = useParams();
    useEffect(() => {
        user_id && dispatch(getEditableUser({_id: user_id}))
    }, [dispatch]);
    if (!user_id) return <Navigate to="/" />;
    if (loading) return <Loading />;
    if (!editable_user) return null;
    const {email} = editable_user
    return (
        <div className={s.userEdit} style={{ '--after-content': `"Editing ${email}"` } as React.CSSProperties}>
            <Outlet />
        </div>
    );
};

export default ProfileAdminEdit;