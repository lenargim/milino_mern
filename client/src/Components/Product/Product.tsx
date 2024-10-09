import React, {FC} from 'react';
import s from './product.module.sass'
import {useParams} from "react-router-dom";
import {OrderFormType} from "../../helpers/types";
import {
    addToCartProduct, getProductById, productValuesType, useAppDispatch,
} from "../../helpers/helpers";
import {
    productCategory, sizeLimitsType
} from "../../helpers/productTypes";
import Cabinet from "./Cabinet";
import {Formik} from 'formik';
import {
    getMaterialData,
    getPriceData,
    getProductRange,
} from "../../helpers/calculatePrice";
import sizes from "../../api/sizes.json";
import {MaybeNull, MaybeUndefined} from "../Profile/RoomForm";
import ProductLeft from "./ProductLeft";
import {getProductSchema} from "./ProductSchema";
import {addToCart} from "../../store/reducers/generalSlice";
import {addToCartInRoomAPI} from "../../api/apiFunctions";
import {updateCartInRoom} from "../../store/reducers/roomSlice";

const Product: FC<{ materials: MaybeNull<OrderFormType> }> = ({materials}) => {
    let {productId, category} = useParams();
    const dispatch = useAppDispatch();
    const {roomId} = useParams();
    if (!productId || !category || !materials) return <div>Product error</div>;
    let product = getProductById(+productId);
    if (!product) return <div>Product error</div>;


    localStorage.setItem('category', category);

    const {id, isBlind, isCornerChoose, customHeight, customDepth} = product;

    const materialData = getMaterialData(materials)
    const {basePriceType} = materialData
    const tablePriceData = getPriceData(id, category as productCategory, basePriceType);
    const productRange = getProductRange(tablePriceData, category as productCategory, customHeight, customDepth);

    const sizeLimit: MaybeUndefined<sizeLimitsType> = sizes.find(size => size.productIds.includes(id))?.limits;
    const {widthRange, heightRange, depthRange} = productRange
    if (!widthRange.length) return <div>Cannot find initial width</div>;
    if (!sizeLimit) return <div>Cannot find size limit</div>;
    if (!tablePriceData) return <div>No price table data</div>

    const initialValues: productValuesType = {
        'Width': widthRange[0],
        isBlind: isBlind,
        'Blind Width': 0,
        'Height': heightRange[0],
        'Depth': depthRange[0],
        'Custom Width': '',
        'Custom Blind Width': '',
        'Custom Height': '',
        'Custom Depth': '',
        'Custom Width Number': '',
        'Custom Blind Width Number': '',
        'Custom Height Number': '',
        'Custom Depth Number': '',
        'Middle Section': '',
        'Middle Section Number': '',
        'Doors': 0,
        'Hinge opening': '',
        'Corner': isCornerChoose ? 'Left' : '',
        'Options': [],
        'Profile': '',
        'Glass Type': '',
        'Glass Color': '',
        'Glass Shelf': '',
        'LED borders': [],
        'LED alignment': 'Center',
        'LED indent': '',
        'Note': '',
        'Door Profile': '',
        'Door Glass Type': '',
        'Door Glass Color': '',
        'Shelf Profile': '',
        'Shelf Glass Type': '',
        'Shelf Glass Color': '',
        image_active_number: 1,
        cartExtras: {
            ptoDoors: 0,
            ptoDrawers: 0,
            glassShelf: 0,
            glassDoor: 0,
            ptoTrashBins: 0,
            ledPrice: 0,
            coefExtra: 1,
            attributes: [],
            boxFromFinishMaterial: false
        },
        price: 0,
    }
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={getProductSchema(product, sizeLimit)}
            onSubmit={(values: productValuesType, {resetForm}) => {
                if (!product) return;
                const cartData = addToCartProduct(product, values, productRange);
                roomId ?
                    addToCartInRoomAPI(cartData, roomId).then(cart => {
                        if (cart) dispatch(updateCartInRoom({cart:cart, _id: roomId}));
                    }) :
                    dispatch(addToCart(cartData))
                resetForm();

            }}
        >
            <>
                <ProductLeft product={product}/>
                <div className={s.right}>
                    <Cabinet product={product}
                             materialData={materialData}
                             productRange={productRange}
                             tablePriceData={tablePriceData}
                             sizeLimit={sizeLimit}
                    />
                </div>
            </>
        </Formik>
    );
};

export default Product;