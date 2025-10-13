import React, {FC} from 'react';
import s from "../Product/product.module.sass";
import {CustomPartType} from "../../helpers/productTypes";
import {useFormikContext} from "formik";
import {getSelectValfromVal, prepareToSelectField} from "../../helpers/helpers";
import SelectField, {optionType} from "../../common/SelectField";
import {CustomPartFormType} from "./CustomPart";
import settings from "../../api/settings.json";

const CustomPartGlassShelfBlock: FC = () => {
    const {values} = useFormikContext<CustomPartFormType>();
    const glass_shelf =  settings['Glass']['glass_shelf'];
    const {
        glass_shelf: glassShelfVal
    } = values

    const glassPrepared = prepareToSelectField(glass_shelf)

    return (
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
    );
};

export default CustomPartGlassShelfBlock;