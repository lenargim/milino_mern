import React, {FC} from 'react';
import s from "../Product/product.module.sass";
import {getImg, getProductImage} from "../../helpers/helpers";
import {CustomPartType} from "../../helpers/productTypes";
import Materials from "../../common/Materials";
import {RoomMaterialsFormType} from "../../helpers/roomTypes";

const CustomPartLeft:FC<{product:CustomPartType, materials:RoomMaterialsFormType}> = ({product, materials}) => {
    const {name, images} = product
    const img = getProductImage(images, 1);
    return (
        <div className={s.left}>
            <h2>{name}</h2>
            <div className={[s.img, s['s']].join(' ')}><img src={img}
                                                                alt={name}/>
            </div>
            <Materials materials={materials}/>
        </div>
    );
};

export default CustomPartLeft;