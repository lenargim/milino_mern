import React, {FC} from 'react';
import s from "../Product/product.module.sass";
import {getImg} from "../../helpers/helpers";
import {CustomPart} from "../../helpers/productTypes";

const CustomPartLeft:FC<{product:CustomPart}> = ({product}) => {
    const {name, images} = product
    return (
        <div className={s.left}>
            <h2>{name}</h2>
            <div className={[s.img, s['s']].join(' ')}><img src={getImg('products/custom', images[0].value)}
                                                                alt={name}/>
            </div>
            {/*<AtrrsList attributes={attributes} type={image_active_number}/>*/}
            {/*<Materials data={materials}/>*/}
        </div>
    );
};

export default CustomPartLeft;