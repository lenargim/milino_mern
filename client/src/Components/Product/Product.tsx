import React, {FC} from 'react';
import s from './product.module.sass'
import {
    addProductToCart, findIsProductStandardByCategory, getFraction,
    getProductById, useAppDispatch,
} from "../../helpers/helpers";
import {
    MaybeUndefined,
    productCategory, productValuesType, sizeLimitsType
} from "../../helpers/productTypes";
import ProductCabinet from "./ProductCabinet";
import {Formik} from 'formik';
import {
    getMaterialData, getProductPriceRange,
    getProductRange,
} from "../../helpers/calculatePrice";
import sizes from "../../api/sizes.json";
import ProductLeft from "./ProductLeft";
import {getProductSchema} from "./ProductSchema";
import {RoomMaterialsFormType} from "../../helpers/roomTypes";
import {addProduct} from "../../store/reducers/roomSlice";

const Product: FC<{ materials: RoomMaterialsFormType, room_id: string, product_id: number, activeProductCategory: productCategory }> = ({
                                                                                                                                            materials,
                                                                                                                                            room_id,
                                                                                                                                            product_id,
                                                                                                                                            activeProductCategory
                                                                                                                                        }) => {
    const dispatch = useAppDispatch();
    const isProductStandard = findIsProductStandardByCategory(activeProductCategory);
    let product = getProductById(product_id, isProductStandard);
    if (!product) return <div>Product error</div>;
    const {
        isBlind,
        isCornerChoose,
        customHeight,
        customDepth,
        hasLedBlock,
        blindArr,
        id,
        hasMiddleSection,
        middleSectionDefault,
        category
    } = product;
    const materialData = getMaterialData(materials);
    const {base_price_type, is_standard_cabinet} = materialData;
    const tablePriceData = getProductPriceRange(id, is_standard_cabinet, base_price_type);
    const productRange = getProductRange(tablePriceData, category as productCategory, customHeight, customDepth);
    const sizeLimit: MaybeUndefined<sizeLimitsType> = sizes.find(size => size.productIds.includes(id))?.limits;
    const {widthRange, heightRange, depthRange} = productRange
    if (!widthRange.length || !sizeLimit || !tablePriceData) return <div>Cannot find product data</div>;
    const middleSectionNumber = hasMiddleSection && middleSectionDefault ? middleSectionDefault : 0;
    const middleSection = hasMiddleSection && middleSectionDefault ? getFraction(middleSectionNumber) : '';
    const initialValues: productValuesType = {
        'Width': widthRange[0],
        isBlind: isBlind,
        'Blind Width': blindArr ? blindArr[0] : '',
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
        glass_door: [],
        glass_shelf: '',
        image_active_number: 1,
        'Note': '',
        price: 0,
    }
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={getProductSchema(product, sizeLimit)}
            onSubmit={async (values: productValuesType, {resetForm, setSubmitting}) => {
                if (!product) return;
                setSubmitting(true)
                const cartData = addProductToCart(product, values, productRange, room_id);
                await dispatch(addProduct({product: cartData}));
                resetForm();
                setSubmitting(false)
            }}
        >
            <>
                <ProductLeft product={product} materials={materials}/>
                <div className={s.right}>
                    <ProductCabinet product={product}
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