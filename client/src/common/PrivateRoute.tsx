import {Navigate} from "react-router-dom";

export type PrivateRouteProps = {
    isAuth: boolean;
    authenticationPath: string;
    outlet: JSX.Element;
    token: string | null
};

export default function PrivateRoute({isAuth, authenticationPath, outlet, token}: PrivateRouteProps) {
    if(isAuth || token) {
        return outlet;
    } else {
        return <Navigate to={{ pathname: authenticationPath }} />;
    }
};
