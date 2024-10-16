import {Formik} from 'formik';
import React, {FC} from 'react';
import {
    getCustomPartById, getInitialMaterialData,
    getLimit,
    useAppDispatch
} from "../../helpers/helpers";
import {MaybeNull} from "../../helpers/productTypes";
import {getCustomPartSchema} from "./CustomPartSchema";
import s from "../Product/product.module.sass";
import {MaterialsFormType} from "../../common/MaterialsForm";
import {Navigate, useParams} from "react-router-dom";
import CustomPartCabinet from "./CustomPartCabinet";
import CustomPartLeft from "./CustomPartLeft";
import LEDForm from "./LEDForm";

type CustomPartFormType = {
    // customPart: customPartDataType,
    materials: MaybeNull<MaterialsFormType>
}
export type CustomPartFormValuesType = {
    Width: string,
    Height: string,
    Depth: string,
    ['Width Number']: number,
    ['Height Number']: number,
    ['Depth Number']: number,
    Material: string,
    Note: string,
    price: number,
    glass_door: string[],
}

const CustomPart: FC<CustomPartFormType> = ({materials}) => {
    const dispatch = useAppDispatch();

    let {productId, roomId} = useParams();
    if (!productId || !materials) return <div>Custom part error</div>;
    const customPart = getCustomPartById(+productId)
    if (!customPart) return <Navigate to={{pathname: '/cabinets'}}/>;
    const {limits, width, depth, type} = customPart;
    const initialMaterialData = getInitialMaterialData(customPart, materials)
    const sizeLimitInitial = initialMaterialData?.limits ?? limits ?? {};
    const isDepthIsConst = !!(initialMaterialData?.depth ?? depth)
    const initialDepth = initialMaterialData?.depth ?? depth ?? getLimit(sizeLimitInitial.depth);

    const initialValues: CustomPartFormValuesType = {
        'Width': Math.ceil(width ?? getLimit(sizeLimitInitial.width)).toString(),
        'Height': Math.ceil(getLimit(sizeLimitInitial.height)).toString(),
        'Depth': Math.ceil(initialDepth).toString(),
        'Width Number': Math.ceil(width ?? getLimit(sizeLimitInitial.width)),
        'Height Number': Math.ceil(getLimit(sizeLimitInitial.height)),
        'Depth Number': Math.ceil(initialDepth),
        'Material': initialMaterialData ? initialMaterialData.name : '',
        'Note': '',
        glass_door: [],
        price: 0,
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={getCustomPartSchema(customPart.materials_array, limits)}
            onSubmit={(values: CustomPartFormValuesType, {resetForm}) => {
                // const cartData = addToCartCustomPart(values, id, price, image, name, category)
                // dispatch(addToCart(cartData))
                // resetForm();
            }}
        >
            <>
            <CustomPartLeft product={customPart}/>
            <div className={s.right}>
                <CustomPartCabinet
                    product={customPart}
                    isDepthIsConst={isDepthIsConst}
                />
            </div>
            </>
        </Formik>
    );
};

export default CustomPart;