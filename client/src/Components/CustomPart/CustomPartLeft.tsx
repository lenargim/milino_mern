import React, {FC} from 'react';
import s from "../Product/product.module.sass";
import {getImg} from "../../helpers/helpers";
import {AtrrsList} from "../Cabinets/List";
import {CustomPart} from "../../helpers/productTypes";

const CustomPartLeft:FC<{product:CustomPart}> = ({product}) => {
    const {name, image} = product
    return (
        <div className={s.left}>
            <h2>{name}</h2>
            <div className={[s.img, s['s']].join(' ')}><img src={getImg('products/custom', image)}
                                                                alt={name}/>
            </div>
            {/*<AtrrsList attributes={attributes} type={image_active_number}/>*/}
            {/*<Materials data={materials}/>*/}
        </div>
    );
};

export default CustomPartLeft;