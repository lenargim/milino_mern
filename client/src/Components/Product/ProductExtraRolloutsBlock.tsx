import React, {FC, useEffect} from 'react';
import s from "./product.module.sass";
import {ProductFormType} from "../../helpers/productTypes";
import {ProductRadioInputNumber} from "../../common/Form";
import {useFormikContext} from "formik";

const ProductExtraRolloutsBlock: FC = () => {
    const amountArr:number[] = [0,1,2];
    const {values, setFieldValue} = useFormikContext<ProductFormType>();
    useEffect(() => {
        if (!values.custom?.extra_rollouts) setFieldValue('custom.extra_rollouts', 0)
    }, [values])

    return (
        <div className={s.block}>
            <h3>Add Extra Rollouts</h3>
            <div className={s.options} role="group">
                {amountArr.map((val, index) => <ProductRadioInputNumber key={index}
                                                                   name="custom.extra_rollouts"
                                                                   value={val}/>)}
            </div>
        </div>
    );
};

export default ProductExtraRolloutsBlock;
