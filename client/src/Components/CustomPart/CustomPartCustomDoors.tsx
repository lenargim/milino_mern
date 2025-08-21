import React, {FC, useEffect} from 'react';
import {Form, useFormikContext} from 'formik';
import {CustomPartType} from "../../helpers/productTypes";
import {CustomPartFormType} from "./CustomPart";
import s from "../Product/product.module.sass";
import {ProductInputCustom, TextInput} from "../../common/Form";
import CustomPartSubmit from "./CustomPartSubmit";
import {getCustomDoorsPrice} from "../../helpers/calculatePrice";

type CustomPartCabinet = {
    product: CustomPartType
}
const CustomPartCabinet: FC<CustomPartCabinet> = ({product}) => {
    const {values, setFieldValue} = useFormikContext<CustomPartFormType>();
    const {
        width,
        height,
        price,
    } = values;

    const {type, name} = product;

    useEffect(() => {
        let newPrice;
        newPrice = getCustomDoorsPrice(width, height, name);
        if (price !== newPrice) {
            setFieldValue('price', newPrice)
        }
    }, [values])
    return (
        <Form>
            <div className={s.block}>
                <h3>Width</h3>
                <div className={s.options}>
                    <ProductInputCustom name="width_string"/>
                </div>
            </div>
            <div className={s.block}>
                <h3>Height</h3>
                <div className={s.options}>
                    <ProductInputCustom name="height_string"/>
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

export default CustomPartCabinet;