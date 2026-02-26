import React, {FC} from 'react';
import s from "../Product/product.module.sass";
import {CustomPartType} from "../../helpers/productTypes";
import Materials from "../../common/Materials";
import {RoomMaterialsFormType} from "../../helpers/roomTypes";
import {useFormikContext} from "formik";
import {CustomPartFormType} from "./CustomPart";
import {getCustomPartImagePath} from "../../helpers/helpers";

const CustomPartLeft: FC<{ product: CustomPartType, materials: RoomMaterialsFormType }> = ({product, materials}) => {
    const {name} = product
    const {values} = useFormikContext<CustomPartFormType>();
    const img = getCustomPartImagePath(product, values);
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