import React, {FC} from 'react';
import {Form, useFormikContext} from 'formik';
import {CustomPartType, materialsCustomPart, MaybeNull} from "../../helpers/productTypes";
import {CustomPartFormType} from "./CustomPart";
import {
    filterCustomPartsMaterialsArray, isLedBlock,
} from "../../helpers/helpers";
import s from "../Product/product.module.sass";
import {ProductInputCustom, ProductRadioInput, TextInput} from "../../common/Form";
import CustomPartSubmit from "./CustomPartSubmit";
import ProductLED from "../Product/ProductLED";
import CustomPartMaterialsArray from "./CustomPartMaterialsArray";


const CustomPartThickFloatingShelf: FC<{filtered_materials_array: MaybeNull<materialsCustomPart[]>, product: CustomPartType}> = ({filtered_materials_array, product}) => {
    const {values} = useFormikContext<CustomPartFormType>();
    const {
        price
    } = values;
    const {id} = product;
    const showLedBlock = isLedBlock(id)

    return (
        <Form>
            <div className={s.block}>
                <h3>Width</h3>
                <div className={s.options}>
                    <ProductInputCustom name="width_string"/>
                </div>
            </div>
            <div className={s.block}>
                <h3>Depth</h3>
                <div className={s.options}>
                    <ProductInputCustom name="depth_string"/>
                </div>
            </div>

            {showLedBlock ? <ProductLED id={id} /> : null}
            <CustomPartMaterialsArray filtered_materials_array={filtered_materials_array} />
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

export default CustomPartThickFloatingShelf;