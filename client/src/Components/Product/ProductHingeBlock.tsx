import React, {FC} from 'react';
import s from "./product.module.sass";
import {ProductRadioInput} from "../../common/Form";

type HingeBlockType = {
    hingeArr: string[]
}
const ProductHingeBlock: FC<HingeBlockType> = ({hingeArr}) => {
    return (
        <div className={s.block}>
            <h3>Hinge opening</h3>
            <div className={s.options}>
                {hingeArr.map((w, index) => <ProductRadioInput key={index}
                                                               name={'Hinge opening'}
                                                               value={w}/>)}
            </div>
        </div>
    );
};

export default ProductHingeBlock;