import React, {FC} from 'react';
import s from "../Product/product.module.sass";
import styles from './../../common/Form.module.sass';
import {CustomPartAttrCheckbox} from "../../common/Form";
import {useFormikContext} from "formik";
import {CustomPartFormType} from "./CustomPart";
import NumberPart from "./CustomPartNumberPart";
import {getSelectValfromVal} from "../../helpers/helpers";
import SelectField from "../../common/SelectField";
import {CustomPartShelves} from "../../helpers/Enums";

const CustomPartShelvesBlock: FC = () => {
    const {values, errors, submitCount} = useFormikContext<CustomPartFormType>();
    const {has_shelves, index, qty} = values.shelves;

    const opts = Object.values(CustomPartShelves).map((el, index) => ({
        value: index.toString(),
        label: el
    }))

    const showNumberError = submitCount > 0 && !!errors.shelves?.qty
    return (
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
    );
};

export default CustomPartShelvesBlock;