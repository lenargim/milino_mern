import React, {FC} from 'react';
import s from './product.module.sass'
import {useParams} from "react-router-dom";
import {
    addProductToCart, getFraction,
    getProductById, productValuesType, useAppDispatch,
} from "../../helpers/helpers";
import {
    MaybeNull, MaybeUndefined,
    productCategory, sizeLimitsType
} from "../../helpers/productTypes";
import Cabinet from "./Cabinet";
import {Formik} from 'formik';
import {
    getMaterialData, getProductPriceRange,
    getProductRange,
} from "../../helpers/calculatePrice";
import sizes from "../../api/sizes.json";
import ProductLeft from "./ProductLeft";
import {getProductSchema} from "./ProductSchema";
import {addToCart} from "../../store/reducers/generalSlice";
import {addToCartInRoomAPI} from "../../api/apiFunctions";
import {updateCartInRoom} from "../../store/reducers/roomSlice";
import {MaterialsFormType} from "../../common/MaterialsForm";

const Product: FC<{ materials: MaybeNull<MaterialsFormType> }> = ({materials}) => {
    const dispatch = useAppDispatch();
    let {productId, category: catFromParam,roomId} = useParams();
    if (!productId || !catFromParam || !materials) return <div>Product error</div>;
    const isProductStandard = ['Standard Base Cabinets', 'Standard Wall Cabinets', 'Standard Tall Cabinets'].includes(catFromParam)
    let product = getProductById(+productId, isProductStandard);
    if (!product) return <div>Product error</div>;
    const {isBlind, isCornerChoose, customHeight, customDepth, hasLedBlock, blindArr, id, hasMiddleSection, middleSectionDefault, category} = product;
    const materialData = getMaterialData(materials);
    const {base_price_type, is_standard_cabinet} = materialData;
    const tablePriceData = getProductPriceRange(id, is_standard_cabinet, base_price_type);
    const productRange = getProductRange(tablePriceData, category as productCategory, customHeight, customDepth);
    const sizeLimit: MaybeUndefined<sizeLimitsType> = sizes.find(size => size.productIds.includes(id))?.limits;
    const {widthRange, heightRange, depthRange} = productRange
    if (!widthRange.length) return <div>Cannot find initial width</div>;
    if (!sizeLimit) return <div>Cannot find size limit</div>;
    if (!tablePriceData) return <div>No price table data</div>
    const middleSectionNumber = hasMiddleSection && middleSectionDefault ? middleSectionDefault : 0;
    const middleSection = hasMiddleSection && middleSectionDefault ? getFraction(middleSectionNumber) : '';
    const initialValues: productValuesType = {
        'Width': widthRange[0],
        isBlind: isBlind,
        'Blind Width': blindArr ? blindArr[0]:'',
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
        'Middle Section': middleSection,
        'Middle Section Number': middleSectionNumber,
        'Doors': 0,
        'Hinge opening': '',
        'Corner': isCornerChoose ? 'Left' : '',
        'Options': [],
        'Profile': '',
        'Glass Type': '',
        'Glass Color': '',
        'Glass Shelf': '',
        'LED borders': [],
        'LED alignment': hasLedBlock ? 'Center' : '',
        'LED indent': '',
        'Note': '',
        'Door Profile': '',
        'Door Glass Type': '',
        'Door Glass Color': '',
        'Shelf Glass Color': '',
        image_active_number: 1,
        price: 0,
    }
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={getProductSchema(product, sizeLimit)}
            onSubmit={(values: productValuesType, {resetForm}) => {
                if (!product) return;
                const cartData = addProductToCart(product, values, productRange,roomId);
                if (roomId) {
                    addToCartInRoomAPI(cartData, roomId).then(cart => {
                        if (cart && roomId) dispatch(updateCartInRoom({cart, _id: roomId}));
                    })
                } else {
                    dispatch(addToCart(cartData))
                }
                resetForm();
            }}
        >
            <>
                <ProductLeft product={product} materials={materials}/>
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