import React, {FC} from 'react';
import s from "../Product/product.module.sass";
import {getCustomPartFormImage, getCustomPartImage, getProductImage} from "../../helpers/helpers";
import {CustomPartType} from "../../helpers/productTypes";
import Materials from "../../common/Materials";
import {RoomMaterialsFormType} from "../../helpers/roomTypes";
import {useFormikContext} from "formik";
import {CustomPartFormType} from "./CustomPart";

const CustomPartLeft: FC<{ product: CustomPartType, materials: RoomMaterialsFormType }> = ({product, materials}) => {
    const {name} = product
    const {values} = useFormikContext<CustomPartFormType>();
    const img = getCustomPartFormImage(product, values);
    return (
        <div className={s.left}>
            <h2>{name}</h2>
            <div className={[s.img, s['s']].join(' ')}>
                <img src={img} alt={name}/>
            </div>
            <Materials materials={materials}/>
        </div>
    );
};

export default CustomPartLeft;