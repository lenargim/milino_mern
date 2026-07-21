import React, {FC} from 'react';
import {Form, useFormikContext} from 'formik';
import {CustomPartType} from "../../helpers/productTypes";
import {CustomPartFormType} from "./CustomPart";
import {
    filterCustomPartsMaterialsArray,
    isHingeHolesBlock,
    isLedBlock,
    isPanelCutoutBlock,
} from "../../helpers/helpers";
import s from "../Product/product.module.sass";
import {ProductInputCustom, ProductRadioInput, TextInput} from "../../common/Form";
import CustomPartSubmit from "./CustomPartSubmit";
import CustomPartHingeHoles from "./CustomPartHingeHoles";
import CustomPartCutoutBlock from "./CustomPartCutoutBlock";
import ProductLED from "../Product/ProductLED";
import NumberPart from "./CustomPartNumberPart";


function getFieldName(name:string):string {
    switch (name) {
        case "Painted Crown Molding":
            return "painted_molding";
    }
    return "";
}

const CustomPartQtyOnly: FC<{ product: CustomPartType }> = ({product}) => {
    const {values, setFieldValue, errors} = useFormikContext<CustomPartFormType>();
    const {price} = values;
    const {name} = product
    const field_name = getFieldName(name)

    return (
        <Form>
            <div className={s.block}>
                <h3>{name}</h3>
                <div className={s.accessories}>
                    <NumberPart label="Quantity" el={field_name} />
                </div>
            </div>
            <div className={s.block}>
                <TextInput type={"text"} label={'Note'} name="note"/>
            </div>
            <div className={s.total}>
                <span>Total: </span>
                <span>{price}$</span>
            </div>
            <CustomPartSubmit/>
        </Form>
    );
};

export default CustomPartQtyOnly;