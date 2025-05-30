import React, {useEffect, useState} from 'react';
import {Route, Routes, useNavigate} from "react-router-dom";
import Login from "./Components/Login/Login";
import SignUp from "./Components/SignUp/SignUp";
import {logout, useAppDispatch, useAppSelector} from "./helpers/helpers";
import PrivateRoute, {PrivateRouteProps} from "./common/PrivateRoute";
import {isTokenValid, me} from "./api/apiFunctions";
import Profile from "./Components/Profile/Profile";
import {setIsAuth, setUser, UserState} from "./store/reducers/userSlice";
import PublicRote from "./common/PublicRoute";
import ProfileMain from "./Components/Profile/ProfileMain";
import ProfileEdit from "./Components/Profile/ProfileEdit";
import ProfileRooms from "./Components/Profile/ProfileRooms";
import ProfileRoom from "./Components/Profile/ProfileRoom";
import NotFound from "./Components/NotFound/NotFound";
import ProfileRoomEdit from "./Components/Profile/ProfileRoomEdit";
import RoomsNew from "./Components/Room/RoomsNew";
import RoomProduct from "./Components/Room/RoomProduct";
import RoomCategory from "./Components/Room/RoomCategory";
import RoomCustomPart from "./Components/Room/RoomCustomPart";
import RoomCheckout from "./Components/Room/RoomCheckout";
import ProfileAdmin from "./Components/Profile/ProfileAdmin";
import Footer from "./common/Footer/Footer";
import ProfileCatalog from "./Components/Profile/ProfileCatalog";
import Constructor from "./Components/Constructor/Constructor";
import Tutorial from "./Components/Profile/Tutorial";

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
                {/*<Route path='/' element={<LoggedInRoute {...privateRouteProps} authenticationPath="/profile" outlet={<OrderForm/>}/>}/>*/}
                {/*<Route path="cabinets"*/}
                {/*       element={<LoggedInRoute*/}
                {/*           {...privateRouteProps}*/}
                {/*           authenticationPath="/profile"*/}
                {/*           outlet={<WithChosenMaterials*/}
                {/*               outlet={<Cabinets/>}/>}/>}/>*/}
                {/*<Route path="/cabinets/product/:category/:productId"*/}
                {/*       element={<WithChosenMaterials outlet={<ProductWrap materials={materials}/>}/>}/>*/}
                {/*<Route path="/cabinets/custom_part/:productId"*/}

                {/*<Route path="/checkout" element={<LoggedInRoute*/}
                {/*    {...privateRouteProps}*/}
                {/*    authenticationPath="/profile"*/}
                {/*    outlet={<WithChosenMaterials*/}
                {/*        outlet={<Checkout/>}/>}/>}/>*/}

                <Route path="/" element={<PublicRote isAuth={isAuth} outlet={<Login/>}/>}/>
                <Route path="/signup" element={<PublicRote isAuth={isAuth} outlet={<SignUp/>}/>}/>

                <Route path='/profile' element={<PrivateRoute {...privateRouteProps} outlet={<Profile/>}/>}>
                    <Route index element={<ProfileMain user={user}/>}/>
                    <Route path="admin" element={<ProfileAdmin user={user}/>}/>
                    <Route path="rooms" element={<ProfileRooms/>}>
                        <Route path=":roomId" element={<ProfileRoom/>}>
                            <Route index element={<RoomCategory/>}/>
                            <Route path="edit" element={<ProfileRoomEdit/>}/>
                            <Route path="product/:category/:productId" element={<RoomProduct/>}/>
                            <Route path="custom_part/:productId" element={<RoomCustomPart/>}/>
                            <Route path="checkout" element={<RoomCheckout/>}/>
                        </Route>
                        <Route path="new" element={<RoomsNew/>}/>
                    </Route>
                    <Route path="edit" element={<ProfileEdit user={user}/>}/>
                    <Route path="constructor" element={<Constructor user={user}/>}/>
                    <Route path="catalog" element={<ProfileCatalog/>}/>
                    <Route path="tutorial" element={<Tutorial/>}>
                    </Route>
                </Route>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
            <Footer/>
        </div>
    );
}

export default App;
