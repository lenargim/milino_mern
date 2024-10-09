import React, {FC} from 'react';
import s from "./product.module.sass";
import {getImg, getImgSize, getProductImage, productValuesType} from "../../helpers/helpers";
import {AtrrsList} from "../Cabinets/List";
import {ProductType} from "../../helpers/productTypes";
import {useFormikContext} from "formik";

const ProductLeft:FC<{product:ProductType}> = ({product}) => {
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
            <AtrrsList attributes={attributes} type={image_active_number}/>
            {/*<Materials data={materials}/>*/}
        </div>
    );
};

export default ProductLeft;