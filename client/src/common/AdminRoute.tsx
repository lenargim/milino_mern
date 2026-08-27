import {Navigate} from 'react-router-dom';
import {useAuthUser} from "../utils/customHooks";
import {has_super_user_access} from "../helpers/helpers";
import ProfileEditorLayout from "../Components/Profile/ProfileEditorProvider";

const AdminRoute = () => {
    const user = useAuthUser();

    if (!has_super_user_access(user)) return <Navigate to="/profile" />;
    return <ProfileEditorLayout user_type="admin"/>
    // return <Outlet />;
};

export default AdminRoute;
