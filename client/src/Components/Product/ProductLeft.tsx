import React, {FC} from 'react';
import s from "./product.module.sass";
import {getImg, getImgSize, getProductImage} from "../../helpers/helpers";
import {ProductType, productValuesType} from "../../helpers/productTypes";
import {useFormikContext} from "formik";
import Materials from "../../common/Materials";
import {ProductAttributes} from "./ProductAttributes";
import {RoomMaterialsFormType} from "../../helpers/roomTypes";

const ProductLeft:FC<{product:ProductType, materials:RoomMaterialsFormType}> = ({product, materials}) => {
    const {images, category, name, attributes} = product;
    const {values: {image_active_number}} = useFormikContext<productValuesType>();
    const img = getProductImage(images, image_active_number);
    const imgSize = getImgSize(category);
    return (
        <div className={s.left}>
            <h2>{name}</h2>
            <div className={[s.img, s[imgSize]].join(' ')}><img src={getImg('products', img)}
                                                                alt={name}/>
            </div>
            <ProductAttributes attributes={attributes} type={image_active_number}/>
            <Materials materials={materials}/>
        </div>
    );
};

export default ProductLeft;