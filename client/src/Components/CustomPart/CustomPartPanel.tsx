import React, {FC} from 'react';
import {Form, useFormikContext} from 'formik';
import {CustomPartType} from "../../helpers/productTypes";
import {CustomPartFormType} from "./CustomPart";
import {filterCustomPartsMaterialsArray,} from "../../helpers/helpers";
import s from "../Product/product.module.sass";
import {ProductInputCustom, ProductRadioInput, TextInput} from "../../common/Form";
import CustomPartSubmit from "./CustomPartSubmit";

type CustomPartPanel = {
    product: CustomPartType,
    isStandardCabinet: boolean
}


const CustomPartPanel: FC<CustomPartPanel> = ({product, isStandardCabinet}) => {
    const {values, setFieldValue, errors} = useFormikContext<CustomPartFormType>();
    const {
        price
    } = values;
    const {materials_array, id} = product;
    const filtered_materials_array = filterCustomPartsMaterialsArray(materials_array, id, isStandardCabinet);

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