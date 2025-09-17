import React, {FC} from 'react';
import s from "./product.module.sass";
import {jeweleryInsertsNames} from "../../helpers/productTypes";
import {ProductOptionsInput} from "../../common/Form";

export type borderType = 'Sides' | 'Top' | 'Bottom';
export type ledAlignmentType = 'Center' | 'From Face' | 'From Back';

const ProductJeweleryBlock: FC = () => {
    return (
        <div className={s.block}>
            <h3>Jewelery Inserts</h3>
            <div className={s.options} role="group">
                {jeweleryInsertsNames.map((val, index) => <ProductOptionsInput key={index}
                                                                               name="custom.jewelery_inserts"
                                                                               value={val}/>)}
            </div>
        </div>
    );
};

export default ProductJeweleryBlock;
