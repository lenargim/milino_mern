import {Navigate} from "react-router-dom";
import {PrivateRouteProps} from "./PrivateRoute";

export default function LoggedInRoute({isAuth, authenticationPath, outlet, token}: PrivateRouteProps) {
    return (isAuth || token) ? <Navigate to={{ pathname: authenticationPath }} /> : outlet
};
