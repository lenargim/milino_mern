import React, {FC} from 'react';
import s from './product.module.sass'
import st from './../Profile/profile.module.sass'
import {addProductToCart, useAppDispatch,} from "../../helpers/helpers";
import {MaybeUndefined, ProductFormType, ProductTableDataType, ProductType} from "../../helpers/productTypes";
import ProductCabinet from "./ProductCabinet";
import {Formik} from 'formik';
import ProductLeft from "./ProductLeft";
import {getProductSchema} from "./ProductSchema";
import {RoomFront, RoomMaterialsFormType} from "../../helpers/roomTypes";
import {addProduct, updateProduct} from "../../store/reducers/roomSlice";
import {useNavigate} from "react-router-dom";

type ProductComponentType = {
    materials: RoomMaterialsFormType,
    room: RoomFront,
    product: ProductType,
    initialProductValues: ProductFormType,
    productData: ProductTableDataType,
    productEditId: MaybeUndefined<string>
}

const Product: FC<ProductComponentType> = ({
                                               materials,
                                               room,
                                               product,
                                               initialProductValues,
                                               productData,
                                               productEditId
                                           }) => {
    const dispatch = useAppDispatch();
    const {sizeLimit} = productData;
    const navigate = useNavigate();
    const {_id: room_id} = room
    return (
        <Formik
            initialValues={initialProductValues}
            enableReinitialize={true}
            validationSchema={getProductSchema(product, sizeLimit)}
            onSubmit={async (values: ProductFormType, {resetForm, setSubmitting}) => {
                if (!product) return;
                setSubmitting(true)
                const cartData = addProductToCart(product, values, room_id, productEditId);
                if (productEditId) {
                    await dispatch(updateProduct({product: cartData}));
                    resetForm();
                    navigate(-1);
                } else {
                    await dispatch(addProduct({product: cartData}));
                    resetForm();
                    setSubmitting(false)
                }
            }}
        >
            <div className={st.product}>
                <ProductLeft product={product} materials={materials} room={room}/>
                <div className={s.right}>
                    <ProductCabinet product={product}
                                    productData={productData}
                                    room={room}
                    />
                </div>
            </div>
        </Formik>
    );
};

export default Product;