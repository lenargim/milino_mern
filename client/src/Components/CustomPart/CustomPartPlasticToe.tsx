import React, {FC, useEffect} from 'react';
import {Form, useFormikContext} from "formik";
import s from "../Product/product.module.sass";
import {ProductRadioInputCustom, TextInput} from "../../common/Form";
import {CustomPartFormType} from "./CustomPart";
import {CustomPartType} from "../../helpers/productTypes";
import CustomPartSubmit from "./CustomPartSubmit";

const CustomPartPlasticToe: FC<{ product: CustomPartType }> = ({product}) => {
    const {values, setFieldValue, isSubmitting} = useFormikContext<CustomPartFormType>();
    const {price } = values;
    const {height_range} = product;
    useEffect(() => {
        const newPrice = 91;
        if (price !== newPrice) setFieldValue('price', newPrice);
    }, [height_range])
    return (
        <Form>
            <div className={s.block}>
                <h3>Height</h3>
                <div className={s.options}>
                    {height_range ? height_range.map((h, index) => <ProductRadioInputCustom key={index}
                                                                                            name="height"
                                                                                            value={h}/>) : null}
                </div>
            </div>
            <div className={s.block}>
                <TextInput type={"text"} label={'Note'} name="note"/>
            </div>
            <div className={s.total}>
                <span>Total: </span>
                <span>{price}$</span>
            </div>
            <CustomPartSubmit />
        </Form>
    );
};

export default CustomPartPlasticToe;