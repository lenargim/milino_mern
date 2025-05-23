import React, {FC} from 'react';
import s from "../Product/product.module.sass";
import {getImg} from "../../helpers/helpers";
import {CustomPartType} from "../../helpers/productTypes";
import Materials from "../../common/Materials";
import {RoomMaterialsFormType} from "../../helpers/roomTypes";

const CustomPartLeft:FC<{product:CustomPartType, materials:RoomMaterialsFormType}> = ({product, materials}) => {
    const {name, images} = product
    return (
        <div className={s.left}>
            <h2>{name}</h2>
            <div className={[s.img, s['s']].join(' ')}><img src={getImg('products/custom', images[0].value)}
                                                                alt={name}/>
            </div>
            <Materials materials={materials}/>
        </div>
    );
};

export default CustomPartLeft;