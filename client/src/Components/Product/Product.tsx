import React, {FC} from 'react';
import s from './product.module.sass'
import st from './../Profile/profile.module.sass'
import {addProductToCart, useAppDispatch,} from "../../helpers/helpers";
import {
    materialDataType, pricePart, ProductFormType, ProductTableDataType, ProductType, sizeLimitsType
} from "../../helpers/productTypes";
import ProductCabinet from "./ProductCabinet";
import {Formik} from 'formik';
import {getProductRange} from "../../helpers/calculatePrice";
import ProductLeft from "./ProductLeft";
import {getProductSchema} from "./ProductSchema";
import {RoomMaterialsFormType} from "../../helpers/roomTypes";
import {addProduct} from "../../store/reducers/roomSlice";

type ProductComponentType = {
    materials: RoomMaterialsFormType,
    room_id: string,
    product: ProductType,
    initialProductValues: ProductFormType,
    productData: ProductTableDataType
}

const Product: FC<ProductComponentType> = ({
                                               materials,
                                               room_id,
                                               product,
                                               initialProductValues,
                                               productData
                                           }) => {
    const dispatch = useAppDispatch();
    const {sizeLimit} = productData
    return (
        <Formik
            initialValues={initialProductValues}
            validationSchema={getProductSchema(product, sizeLimit)}
            onSubmit={async (values: ProductFormType, {resetForm, setSubmitting}) => {
                if (!product) return;
                setSubmitting(true)
                const cartData = addProductToCart(product, values, room_id);
                await dispatch(addProduct({product: cartData}));
                resetForm();
                setSubmitting(false)
            }}
        >
            <div className={st.product}>
                <ProductLeft product={product} materials={materials}/>
                <div className={s.right}>
                    <ProductCabinet product={product}
                                    productData={productData}
                    />
                </div>
            </div>
        </Formik>
    );
};

export default Product;