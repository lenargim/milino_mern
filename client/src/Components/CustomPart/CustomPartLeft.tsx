import React, {FC} from 'react';
import s from "../Product/product.module.sass";
import {getImg} from "../../helpers/helpers";
import {CustomPart} from "../../helpers/productTypes";
import {MaterialsFormType} from "../../common/MaterialsForm";
import Materials from "../../common/Materials";

const CustomPartLeft:FC<{product:CustomPart, materials:MaterialsFormType}> = ({product, materials}) => {
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