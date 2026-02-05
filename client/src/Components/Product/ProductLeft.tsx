import React, {FC} from 'react';
import s from "./product.module.sass";
import {getImgSize, getProductImagePath} from "../../helpers/helpers";
import {ProductType, ProductFormType} from "../../helpers/productTypes";
import {useFormikContext} from "formik";
import Materials from "../../common/Materials";
import {ProductAttributes} from "./ProductAttributes";
import {RoomFront, RoomMaterialsFormType} from "../../helpers/roomTypes";

const ProductLeft: FC<{ product: ProductType, materials: RoomMaterialsFormType, room: RoomFront}> = ({
                                                                                                                       product,
                                                                                                                       materials,
                                                                                                                       room
                                                                                                                   }) => {
    const {name, attributes} = product;
    const {values: {image_active_number, doors_amount, hinge_opening, corner}} = useFormikContext<ProductFormType>();
    const {category} = room;
    const img = getProductImagePath(room, product, hinge_opening ?? corner);
    const imgSize = getImgSize(category);
    return (
        <div className={s.left}>
            <h2>{name}</h2>
            <div className={[s.img, s[imgSize]].join(' ')}><img src={img}
                                                                alt={name}/>
            </div>
            <ProductAttributes doors_amount={doors_amount} attributes={attributes} type={image_active_number}/>
            <Materials materials={materials}/>
        </div>
    );
};

export default ProductLeft;