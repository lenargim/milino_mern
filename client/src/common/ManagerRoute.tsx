import {Navigate} from 'react-router-dom';
import {useAuthUser} from "../utils/customHooks";
import {has_manager_access} from "../helpers/helpers";
import ProfileEditorLayout from "../Components/Profile/ProfileEditorProvider";

const ManagerRoute = () => {
    const user = useAuthUser();

    if (!has_manager_access(user)) return <Navigate to="/profile" />;
    return <ProfileEditorLayout user_type="manager"/>
};

export default ManagerRoute;
