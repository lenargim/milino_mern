import React, {FC, useEffect} from 'react';
import s from "./product.module.sass";
import {MechanismType, ProductFormType} from "../../helpers/productTypes";
import {ProductRadioInput} from "../../common/Form";
import {useFormikContext} from "formik";

const ProductMechanism: FC<{ hasMechanism: MechanismType }> = ({hasMechanism}) => {
    const {attributes, label} = hasMechanism;
    const {values, setFieldValue} = useFormikContext<ProductFormType>();
    useEffect(() => {
        if (!values.custom?.mechanism) setFieldValue('custom.mechanism', attributes[0].name)
    }, [values])

    return (
        <div className={s.block}>
            <h3>{label}</h3>
            <div className={s.options} role="group">
                {attributes.map((val, index) => <ProductRadioInput key={index}
                                                                   name="custom.mechanism"
                                                                   value={val.name}/>)}
            </div>
        </div>
    );
};

export default ProductMechanism;
