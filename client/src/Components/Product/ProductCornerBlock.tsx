import React, {FC} from 'react';
import s from "./product.module.sass";
import {ProductRadioInput} from "../../common/Form";
import {cornerArr, MaybeUndefined} from "../../helpers/productTypes";

type CornerBlockType = {
    isCornerChoose: MaybeUndefined<boolean>
}


const ProductCornerBlock:FC<CornerBlockType> = ({isCornerChoose}) => {
    if (!isCornerChoose) return null
    return (
        <div className={s.block}>
            <h3>Corner</h3>
            <div className={s.options}>
                {cornerArr.map((w, index) => <ProductRadioInput key={index}
                                                                name={'Corner'}
                                                                value={w}/>)}
            </div>
        </div>
    );
};

export default ProductCornerBlock;