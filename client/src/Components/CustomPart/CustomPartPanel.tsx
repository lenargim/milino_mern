import React, {FC, useEffect} from 'react';
import {Form, useFormikContext} from 'formik';
import {CustomPartType, materialsCustomPart, MaybeNull} from "../../helpers/productTypes";
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
import CustomPartMaterialsArray from "./CustomPartMaterialsArray";

type CustomPartPanelType = {
    product: CustomPartType,
    filtered_materials_array:  MaybeNull<materialsCustomPart[]>
}


const CustomPartPanel: FC<CustomPartPanelType> = ({product, filtered_materials_array}) => {
    const {values, setFieldValue} = useFormikContext<CustomPartFormType>();
    const {price} = values;
    const {id} = product;
    const showHingeHoles = isHingeHolesBlock(id)
    const showCutout = isPanelCutoutBlock(id)
    const showLedBlock = isLedBlock(id)

    useEffect(() => {
        // Change depth for shaker panel
        if (id === 910) {
            switch (values?.material) {
                case "Milino":
                case "Zenit":
                case "OneSkin":
                case "Egger":
                case "Cleaf":
                    setFieldValue('depth', 0.75);
                    break;
                case "Painted":
                    setFieldValue('depth', 0.825)
                    break;
                default:
                    setFieldValue('depth', 1)
            }
        }

    }, [values.material]);
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
            {showLedBlock ? <ProductLED id={id} /> : null}
            {showHingeHoles ? <CustomPartHingeHoles/> : null}
            {showCutout ? <CustomPartCutoutBlock/> : null}
            <CustomPartMaterialsArray filtered_materials_array={filtered_materials_array}/>

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

export default CustomPartPanel;