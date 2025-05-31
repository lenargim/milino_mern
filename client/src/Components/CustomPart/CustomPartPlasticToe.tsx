import React, {FC, useEffect} from 'react';
import {Form, useFormikContext} from "formik";
import s from "../Product/product.module.sass";
import {ProductRadioInputCustom, TextInput} from "../../common/Form";
import {CustomPartFormValuesType} from "./CustomPart";
import {CustomPartType} from "../../helpers/productTypes";

const CustomPartPlasticToe: FC<{ product: CustomPartType }> = ({product}) => {
    const {values, setFieldValue, isSubmitting} = useFormikContext<CustomPartFormValuesType>();
    const {price } = values;
    const {height_range} = product;
    useEffect(() => {
        const newPrice = 91;
        if (price !== newPrice) setFieldValue('price', newPrice);
    }, [values])
    return (
        <Form>
            <div className={s.block}>
                <h3>Height</h3>
                <div className={s.options}>
                    {height_range ? height_range.map((h, index) => <ProductRadioInputCustom key={index}
                                                                                            name={'Height Number'}
                                                                                            value={h}/>) : null}
                </div>
            </div>
            <div className={s.block}>
                <TextInput type={"text"} label={'Note'} name="Note"/>
            </div>
            <div className={s.total}>
                <span>Total: </span>
                <span>{price}$</span>
            </div>
            <button type="submit" className={['button yellow'].join(' ')} disabled={isSubmitting}>Add to cart</button>
        </Form>
    );
};

export default CustomPartPlasticToe;