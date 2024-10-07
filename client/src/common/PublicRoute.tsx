import {Navigate} from "react-router-dom";

type LoginedRouteProps = {
    isAuth: boolean;
    outlet: JSX.Element;
};

export default function PublicRote({isAuth, outlet}: LoginedRouteProps) {
    if(!isAuth) {
        return outlet;
    } else {
        return <Navigate to={{ pathname: '/profile' }} />;
    }
};
