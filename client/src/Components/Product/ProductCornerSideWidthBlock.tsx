import React, {FC} from 'react';
import s from "./product.module.sass";
import {ProductCheckboxInput, ProductInputCustom, ProductRadioInputCustom} from "../../common/Form";
import {FinishSidesTypes, MaybeEmpty, MaybeUndefined} from "../../helpers/productTypes";

const ProductCornerSideWidthBlock: FC<{ arr:MaybeUndefined<number[]>, blind_width:MaybeEmpty<number> }> = ({arr, blind_width}) => {
    if (!arr) return null;
    return (
        <div className={s.block}>
            <h3>Side Width</h3>
            <div className={s.options}>
                {arr.length && arr.map((w, index) => <ProductRadioInputCustom
                    key={index}
                    name={'blind_width'}
                    value={w}
                    label_custom="Custom Width"
                />)}
                {!blind_width && <ProductInputCustom name="custom_blind_width_string"/>}
            </div>
        </div>
    );
};

export default ProductCornerSideWidthBlock;