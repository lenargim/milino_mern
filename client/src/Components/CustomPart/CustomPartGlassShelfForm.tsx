import React, {FC} from 'react';
import s from "../Product/product.module.sass";
import {ProductInputCustom, TextInput} from "../../common/Form";
import {Form, useFormikContext} from "formik";
import SelectField from "../../common/SelectField";
import {getSelectValfromVal, prepareToSelectField} from "../../helpers/helpers";
import {CustomPartFormType} from "./CustomPart";
import settings from "../../api/settings.json";
import CustomPartSubmit from "./CustomPartSubmit";

const CustomPartGlassShelfForm:FC = () => {
    const {values} = useFormikContext<CustomPartFormType>();
    const glass_shelf =  settings['Glass']['glass_shelf'];
    const {
        glass_shelf: glassShelfVal,
        price
    } = values

    const glassPrepared = prepareToSelectField(glass_shelf)
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
            <div className={s.blockWrap}>
                {glass_shelf.length ?
                    <div className={s.block}>
                        <h3>Glass Color</h3>
                        <SelectField label="Color"
                                     name="glass_shelf"
                                     val={getSelectValfromVal(glassShelfVal, glassPrepared)}
                                     options={glassPrepared}/>
                    </div> : null}

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

export default CustomPartGlassShelfForm;