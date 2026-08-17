import React, {FC, useEffect} from 'react';
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

type CustomPartPanel = {
    product: CustomPartType,
    isStandardCabinet: boolean
}


const CustomPartPanel: FC<CustomPartPanel> = ({product, isStandardCabinet}) => {
    const {values, setFieldValue, errors} = useFormikContext<CustomPartFormType>();
    const {price} = values;
    const {materials_array, id} = product;
    const filtered_materials_array = filterCustomPartsMaterialsArray(materials_array, id, isStandardCabinet);
    const showHingeHoles = isHingeHolesBlock(id)
    const showCutout = isPanelCutoutBlock(id)
    const showLedBlock = isLedBlock(id)

    useEffect(() => {
        // Change depth for shaker panel
        if (id === 910) {
            switch (values?.material) {
                case "Milino":
                case "Zenit":
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
            {filtered_materials_array &&
            <div className={s.block}>
              <h3>Material</h3>
              <div className={s.options}>
                  {filtered_materials_array.map((m, index) => <ProductRadioInput key={index}
                                                                                 name="material"
                                                                                 value={m.name}/>)}
              </div>
            </div>
            }


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