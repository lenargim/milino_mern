import React, {FC} from 'react';
import s from "./product.module.sass";
import {getImgSize, getProductImage} from "../../helpers/helpers";
import {ProductType, ProductFormType} from "../../helpers/productTypes";
import {useFormikContext} from "formik";
import Materials from "../../common/Materials";
import {ProductAttributes} from "./ProductAttributes";
import {RoomMaterialsFormType} from "../../helpers/roomTypes";

const ProductLeft:FC<{product:ProductType, materials:RoomMaterialsFormType}> = ({product, materials}) => {
    const {images, category, name, attributes} = product;
    const {values: {image_active_number, doors_amount}} = useFormikContext<ProductFormType>();
    const img = getProductImage(images, image_active_number);
    const imgSize = getImgSize(category);
    return (
        <div className={s.left}>
            <h2>{name}</h2>
            <div className={[s.img, s[imgSize]].join(' ')}><img src={img}
                                                                alt={name}/>
            </div>
            {doors_amount ? <div>
                <span>Doors: </span>
                <span>{doors_amount}</span>
            </div>: null}
            <ProductAttributes attributes={attributes} type={image_active_number}/>
            <Materials materials={materials}/>
        </div>
    );
};

export default ProductLeft;