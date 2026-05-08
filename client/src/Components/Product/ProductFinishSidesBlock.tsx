import React, {FC} from 'react';
import s from "./product.module.sass";
import {ProductCheckboxInput} from "../../common/Form";
import {FinishSidesTypes} from "../../helpers/productTypes";

const ProductFinishSidesBlock: FC<{ arr: FinishSidesTypes[] }> = ({arr}) => {
    return (
        <div className={s.block}>
            <h3>Finish Sides</h3>
            <div className={s.options}>
                {arr.map((w, index) => <ProductCheckboxInput key={index}
                                                             name="finish_sides"
                                                             inputIndex={index}
                                                             value={w}/>)}
            </div>
        </div>
    );
};

export default ProductFinishSidesBlock;