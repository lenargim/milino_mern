import React, {FC} from 'react';
import s from "../Product/product.module.sass";
import styles from './../../common/Form.module.sass';
import {CustomPartAttrCheckbox} from "../../common/Form";
import {useFormikContext} from "formik";
import {CustomPartFormType} from "./CustomPart";
import NumberPart from "./CustomPartNumberPart";
import {getSelectValfromVal, hasGlassShelfColor, prepareToSelectField} from "../../helpers/helpers";
import SelectField from "../../common/SelectField";
import {CustomPartShelves} from "../../helpers/Enums";
import settings from "../../api/settings.json";

const CustomPartShelvesBlock: FC = () => {
    const glass_shelf = settings['Glass']['Glass'];
    const glassPrepared = prepareToSelectField(glass_shelf)
    const {values, errors, submitCount} = useFormikContext<CustomPartFormType>();
    const opts = Object.values(CustomPartShelves).map((el, index) => ({
        value: index.toString(),
        label: el
    }))
    const {has_shelves, index, color,qty} = values.shelves;
    const showNumberError = submitCount > 0 && !!errors.shelves?.qty


    // If Shelves are Glass
    const showColorBlock = hasGlassShelfColor(index) && qty;
    return (
        <>
            <div className={s.block}>
                <div className={s.col_150}>
                    <CustomPartAttrCheckbox
                        className={s.butonFlexLeft}
                        label="Add Shelves"
                        name="shelves.has_shelves"
                    />
                    {has_shelves ?
                        <div>
                            <NumberPart el="shelves.qty"/>
                            {showNumberError && <div className={styles.error}>{errors.shelves?.qty}</div>}
                        </div> : null
                    }
                </div>
                {has_shelves &&
                    <SelectField label="Shelves Type"
                                 name="shelves.index"
                                 val={getSelectValfromVal(index?.toString(), opts)}
                                 options={opts}
                    />
                }
            </div>
            {showColorBlock && <div className={s.block}>
                <h3>Glass Color</h3>
                <SelectField label="Color"
                             name="shelves.color"
                             val={getSelectValfromVal(color, glassPrepared)}
                             options={glassPrepared}/>
            </div>}
        </>
    );
};

export default CustomPartShelvesBlock;