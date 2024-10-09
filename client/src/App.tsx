import React, {useEffect} from 'react';
import OrderForm from "./Components/OrderForm/OrderForm";
import {Route, Routes} from "react-router-dom";
import Cabinets from "./Components/Cabinets/Cabinets";
import Product from "./Components/Product/Product";
import WithChosenMaterials from "./common/WithChosenMaterials";
import Checkout from "./Components/Checkout/Checkout";
import CustomPart from "./Components/CustomPart/CustomPart";
import Login from "./Components/Login/Login";
import SignUp from "./Components/SignUp/SignUp";
import {useAppDispatch, useAppSelector} from "./helpers/helpers";
import PrivateRoute, {PrivateRouteProps} from "./common/PrivateRoute";
import {me} from "./api/apiFunctions";
import Profile from "./Components/Profile/Profile";
import {setIsAuth, setUser} from "./store/reducers/userSlice";
import PublicRote from "./common/PublicRoute";
import ProfileMain from "./Components/Profile/ProfileMain";
import ProfileEdit from "./Components/Profile/ProfileEdit";
import ProfileRooms from "./Components/Profile/ProfileRooms";
import ProfileRoom from "./Components/Profile/ProfileRoom";
import NotFound from "./Components/NotFound/NotFound";
import ProfileRoomEdit from "./Components/Profile/ProfileRoomEdit";
import RoomsEmpty from "./Components/Profile/RoomsNew";
import RoomProduct from "./Components/Profile/RoomProduct";
import RoomCategory from "./Components/Profile/RoomCategory";
import {OrderFormType} from "./helpers/types";
import {MaybeNull} from "./Components/Profile/RoomForm";
import ProductWrap from "./Components/Product/ProductWrap";

function App() {
    const dispatch = useAppDispatch()
    const {isAuth, user} = useAppSelector(state => state.user);
    const token = localStorage.getItem('token');
    const privateRouteProps: Omit<PrivateRouteProps, 'outlet'> = {
        isAuth,
        token,
        authenticationPath: '/login',
    };

    const materialsString = localStorage.getItem('materials');
    const materials:MaybeNull<OrderFormType> = materialsString ? JSON.parse(materialsString) : null

    useEffect(() => {
        token && me().then(user => {
            if (user) {
                dispatch(setUser(user))
                dispatch(setIsAuth(true))
            }
        });
    }, [isAuth]);
    return (
        <div className="app">
            <Routes>
                <Route path="/" element={<OrderForm/>}/>
                <Route path="cabinets" element={<WithChosenMaterials outlet={<Cabinets/>}/>}/>
                <Route path="/cabinets/product/:category/:productId"
                       element={<WithChosenMaterials outlet={<ProductWrap materials={materials} />}/>}/>
                <Route path="/cabinets/custom_part/:productId" element={<WithChosenMaterials outlet={<CustomPart/>}/>}/>
                <Route path="/cabinets/pvc/:productId" element={<WithChosenMaterials outlet={<CustomPart/>}/>}/>

                <Route path="/checkout" element={<WithChosenMaterials outlet={<Checkout/>}/>}/>
                <Route path="/login" element={<PublicRote isAuth={isAuth} outlet={<Login/>}/>}/>
                <Route path="/signup" element={<PublicRote isAuth={isAuth} outlet={<SignUp/>}/>}/>
                <Route path='/profile' element={<PrivateRoute {...privateRouteProps} outlet={<Profile/>}/>}>
                    <Route index element={<ProfileMain user={user}/>}/>
                    <Route path="rooms" element={<ProfileRooms user={user}/>}>
                        <Route path=":roomId" element={<ProfileRoom/>}>
                            <Route index element={<RoomCategory/>}/>
                            <Route path="edit" element={<ProfileRoomEdit/>}/>
                            <Route path="product/:category/:productId" element={<RoomProduct/>}/>
                        </Route>
                        <Route path="new" element={<RoomsEmpty/>}/>
                    </Route>
                    <Route path="edit" element={<ProfileEdit user={user}/>}/>
                </Route>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </div>
    );
}

export default App;
