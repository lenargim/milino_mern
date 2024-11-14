import React, {useEffect} from 'react';
import OrderForm from "./Components/OrderForm/OrderForm";
import {Route, Routes} from "react-router-dom";
import Cabinets from "./Components/Cabinets/Cabinets";
import WithChosenMaterials from "./common/WithChosenMaterials";
import Checkout from "./Components/Checkout/Checkout";
import Login from "./Components/Login/Login";
import SignUp from "./Components/SignUp/SignUp";
import {getStorageMaterials, useAppDispatch, useAppSelector} from "./helpers/helpers";
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
import RoomsNew from "./Components/Profile/RoomsNew";
import RoomProduct from "./Components/Profile/RoomProduct";
import RoomCategory from "./Components/Profile/RoomCategory";
import ProductWrap from "./Components/Product/ProductWrap";
import {MaybeNull} from "./helpers/productTypes";
import {MaterialsFormType} from "./common/MaterialsForm";
import CustomPartWrap from "./Components/CustomPart/CustomPartWrap";
import RoomCustomPart from "./Components/Profile/RoomCustomPart";
import RoomCheckout from "./Components/Profile/RoomCheckout";
import LoggedInRoute from "./common/LoggedInRoute";

function App() {
    const dispatch = useAppDispatch()
    const {isAuth, user} = useAppSelector(state => state.user);
    const materials: MaybeNull<MaterialsFormType> = useAppSelector(state => state.general.materials) ?? getStorageMaterials();
    const token = localStorage.getItem('token');
    const privateRouteProps: Omit<PrivateRouteProps, 'outlet'> = {
        isAuth,
        token,
        authenticationPath: '/login',
    };

    useEffect(() => {
        token && me().then(user => {
            user ? dispatch(setUser(user)) : dispatch(setIsAuth(false))
        });
    }, [isAuth]);
    return (
        <div className="app">
            <Routes>
                <Route path='/' element={<LoggedInRoute {...privateRouteProps} authenticationPath="/profile"
                                                        outlet={<OrderForm/>}/>}/>
                <Route path="cabinets"
                       element={<LoggedInRoute
                           {...privateRouteProps}
                           authenticationPath="/profile"
                           outlet={<WithChosenMaterials
                               outlet={<Cabinets/>}/>}/>}/>
                <Route path="/cabinets/product/:category/:productId"
                       element={<WithChosenMaterials outlet={<ProductWrap materials={materials}/>}/>}/>
                <Route path="/cabinets/custom_part/:productId"
                       element={<WithChosenMaterials outlet={<CustomPartWrap materials={materials}/>}/>}/>

                <Route path="/checkout" element={<LoggedInRoute
                    {...privateRouteProps}
                    authenticationPath="/profile"
                    outlet={<WithChosenMaterials
                        outlet={<Checkout/>}/>}/>}/>
                <Route path="/login" element={<PublicRote isAuth={isAuth} outlet={<Login/>}/>}/>
                <Route path="/signup" element={<PublicRote isAuth={isAuth} outlet={<SignUp/>}/>}/>

                <Route path='/profile' element={<PrivateRoute {...privateRouteProps} outlet={<Profile/>}/>}>
                    <Route index element={<ProfileMain user={user}/>}/>
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
                </Route>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </div>
    );
}

export default App;
