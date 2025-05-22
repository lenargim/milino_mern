import React, {useEffect} from 'react';
import {Route, Routes, useNavigate} from "react-router-dom";
import Login from "./Components/Login/Login";
import SignUp from "./Components/SignUp/SignUp";
import {logout, useAppDispatch, useAppSelector} from "./helpers/helpers";
import PrivateRoute, {PrivateRouteProps} from "./common/PrivateRoute";
import {isTokenValid, me} from "./api/apiFunctions";
import Profile from "./Components/Profile/Profile";
import {setUser, UserState} from "./store/reducers/userSlice";
import PublicRote from "./common/PublicRoute";
import ProfileMain from "./Components/Profile/ProfileMain";
import ProfileEdit from "./Components/Profile/ProfileEdit";
import Room from "./Components/Room/Room";
import NotFound from "./Components/NotFound/NotFound";
import RoomEdit from "./Components/Room/RoomEdit";
import RoomNew from "./Components/Room/RoomNew";
import RoomProduct from "./Components/Room/RoomProduct";
import RoomCategory from "./Components/Room/RoomCategory";
import RoomCustomPart from "./Components/Room/RoomCustomPart";
import CheckoutForm from "./Components/Checkout/CheckoutForm";
import ProfileAdmin from "./Components/Profile/ProfileAdmin";
import Footer from "./common/Footer/Footer";
import ProfileCatalog from "./Components/Profile/ProfileCatalog";
import Constructor from "./Components/Constructor/Constructor";
import ProfileTutorial from "./Components/Profile/ProfileTutorial";
import PurchaseOrder from "./Components/PurchaseOrder/PurchaseOrder";
import PurchaseOrderNew from "./Components/PurchaseOrder/PurchaseOrderNew";
import PurchaseOrderItem from "./Components/PurchaseOrder/PurchaseOrderItem";

function App() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {isAuth, user} = useAppSelector<UserState>(state => state.user);
    const token = localStorage.getItem('token');
    const privateRouteProps: Omit<PrivateRouteProps, 'outlet'> = {
        isAuth,
        token,
        authenticationPath: '/',
    };
    useEffect(() => {
        if (!token) {
            logout();
            navigate('/');
        } else {
            const isValid = isTokenValid(token);
            if (!isValid || !user._id) {
                me().then(user => {
                    if (user) {
                        dispatch(setUser(user));
                    } else {
                        logout();
                    }
                });
            }
        }
    }, []);
    return (
        <div className="app">
            <Routes>
                <Route path="/" element={<PublicRote isAuth={isAuth} outlet={<Login/>}/>}/>
                <Route path="/signup" element={<PublicRote isAuth={isAuth} outlet={<SignUp/>}/>}/>
                <Route path='/profile' element={<PrivateRoute {...privateRouteProps} outlet={<Profile/>}/>}>
                    <Route index element={<ProfileMain user={user}/>}/>
                    <Route path="admin" element={<ProfileAdmin user={user}/>}/>
                    <Route path="purchase" element={<PurchaseOrder/>}>
                        <Route path="new" element={<PurchaseOrderNew/>}/>
                        <Route path=":name" element={<PurchaseOrderItem/>}>
                            <Route path=":roomId" element={<Room/>}>
                                <Route index element={<RoomCategory/>}/>
                                <Route path="edit" element={<RoomEdit/>}/>
                                <Route path="product/:category/:productId" element={<RoomProduct/>}/>
                                <Route path="custom_part/:productId" element={<RoomCustomPart/>}/>
                                <Route path="checkout" element={<CheckoutForm/>}/>
                            </Route>
                            <Route path="new" element={<RoomNew/>}/>
                        </Route>
                    </Route>
                    <Route path="edit" element={<ProfileEdit user={user}/>}/>
                    <Route path="constructor" element={<Constructor user={user}/>}/>
                    <Route path="catalog" element={<ProfileCatalog/>}/>
                    <Route path="tutorial" element={<ProfileTutorial/>}>
                    </Route>
                </Route>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
            <Footer/>
        </div>
    );
}

export default App;
