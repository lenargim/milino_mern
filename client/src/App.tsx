import React from 'react';
import {Route, Routes} from "react-router-dom";
import Login from "./Components/Login/Login";
import SignUp from "./Components/SignUp/SignUp";
import Profile from "./Components/Profile/Profile";
import ProfileMain from "./Components/Profile/ProfileMain";
import ProfileEdit from "./Components/Profile/ProfileEdit";
import Room from "./Components/Room/Room";
import NotFound from "./Components/NotFound/NotFound";
import RoomEdit from "./Components/Room/RoomEdit";
import RoomNew from "./Components/Room/RoomNew";
import RoomProduct from "./Components/Room/RoomProduct";
import RoomCategory from "./Components/Room/RoomCategory";
import CheckoutForm from "./Components/Checkout/CheckoutForm";
import ProfileAdmin from "./Components/Profile/ProfileAdmin";
import Footer from "./common/Footer/Footer";
import ProfileCatalog from "./Components/Profile/ProfileCatalog";
import Constructor from "./Components/Constructor/Constructor";
import ProfileTutorial from "./Components/Profile/ProfileTutorial";
import PurchaseOrder from "./Components/PurchaseOrder/PurchaseOrder";
import PurchaseOrderNew from "./Components/PurchaseOrder/PurchaseOrderNew";
import PurchaseOrderItem from "./Components/PurchaseOrder/PurchaseOrderItem";
import PurchaseOrderEdit from "./Components/PurchaseOrder/PurchaseOrderEdit";
import PurchaseOrderRooms from "./Components/PurchaseOrder/PurchaseOrderRooms";
import PrivateRoute from "./common/PrivateRoute";
import PublicRote from "./common/PublicRoute";
import RoomEditCartProduct from "./Components/Room/RoomEditCartProduct";
import ProfileCatalog2020 from "./Components/Profile/ProfileCatalog2020";

function App() {
    return (
        <div className="app">
            <Routes>
                <Route element={<PublicRote/>}>
                    <Route path="/" element={<Login/>}/>
                    <Route path="/signup" element={<SignUp/>}/>
                    <Route path="*" element={<NotFound/>}/>
                </Route>
                <Route element={<PrivateRoute/>}>
                    <Route path='/profile' element={<Profile/>}>
                        <Route index element={<ProfileMain/>}/>
                        <Route path="admin" element={<ProfileAdmin/>}/>
                        <Route path="purchase" element={<PurchaseOrder/>}>
                            <Route path="new" element={<PurchaseOrderNew/>}/>
                            <Route path=":purchase_order_name" element={<PurchaseOrderItem/>}>
                                <Route path="edit" element={<PurchaseOrderEdit/>}/>
                                <Route path="rooms" element={<PurchaseOrderRooms/>}>
                                    <Route path="new" element={<RoomNew/>}/>
                                    <Route path=":room_name" element={<Room/>}>
                                        <Route path="edit" element={<RoomEdit/>}/>
                                        <Route index element={<RoomCategory/>}/>
                                        <Route path="product/:productId/edit/:cartId" element={<RoomEditCartProduct />}/>
                                        <Route path="product/:productId" element={<RoomProduct/>}/>
                                        <Route path="checkout" element={<CheckoutForm/>}/>
                                    </Route>
                                </Route>
                            </Route>
                        </Route>
                        <Route path="edit" element={<ProfileEdit/>}/>
                        <Route path="constructor" element={<Constructor/>}/>
                        <Route path="catalog" element={<ProfileCatalog/>}/>
                        <Route path="catalog_2020" element={<ProfileCatalog2020/>}/>
                        <Route path="tutorial" element={<ProfileTutorial/>}>
                        </Route>
                    </Route>
                </Route>
            </Routes>
            <Footer/>
        </div>
    );
}

export default App;
