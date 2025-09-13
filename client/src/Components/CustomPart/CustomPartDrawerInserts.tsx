import React, {FC} from 'react';
import {Form, useField, useFormikContext} from 'formik';
import {CustomPartType} from "../../helpers/productTypes";
import {
    CustomPartFormType, DrawerInsertsBoxNames,
    DrawerInsertsColorNames,
    DrawerInsertsLetterNames,
} from "./CustomPart";
import {
    getSelectValfromVal, prepareToSelectField,
} from "../../helpers/helpers";
import s from "../Product/product.module.sass";
import {ProductInputCustom, TextInput} from "../../common/Form";
import CustomPartSubmit from "./CustomPartSubmit";
import SelectField, {optionType} from "../../common/SelectField";

type CustomPartDrawerInserts = {
    product: CustomPartType,
    isStandardCabinet: boolean
}

const filterLetterTypeByWidth = (width:number, drawerInsertsLetters:optionType[]):optionType[] => {
    if (width < 18) return drawerInsertsLetters.filter(el => ['A', 'B', 'C'].includes(el.value));
    if (width < 21) return drawerInsertsLetters.filter(el => ['B', 'C', 'D', 'E'].includes(el.value));
    if (width < 24) return drawerInsertsLetters.filter(el => ['C', 'D', 'E', 'F'].includes(el.value));
    if (width < 27) return drawerInsertsLetters.filter(el => ['D', 'E', 'F', 'G'].includes(el.value));
    if (width < 30) return drawerInsertsLetters.filter(el => ['E', 'F', 'G', 'H'].includes(el.value));
    if (width < 48) return drawerInsertsLetters.filter(el => ['F', 'G', 'H', 'I'].includes(el.value));
    return []
}

const CustomPartDrawerInserts: FC<CustomPartDrawerInserts> = ({product, isStandardCabinet}) => {
    const {values, setFieldValue} = useFormikContext<CustomPartFormType>();
    const {
        width,
        price,
        drawer_inserts,
    } = values;
    const [field, meta, helpers] = useField('width_string');
    const drawerInsertsTypeArr: optionType[] = prepareToSelectField([...DrawerInsertsBoxNames]);
    const drawerInsertsColorArr: optionType[] = prepareToSelectField([...DrawerInsertsColorNames]);
    const drawerInsertsLetters: optionType[] = prepareToSelectField([...DrawerInsertsLetterNames]);
    const showLetters = drawer_inserts && drawer_inserts.color && drawer_inserts.box_type === 'Inserts';
    const drawerInsertsLettersFiltered = filterLetterTypeByWidth(width, drawerInsertsLetters);

        // console.log(values)
    return (
        <Form>
            <div className={s.block}>
                <h3>Width</h3>
                <div className={s.options}>
                    <ProductInputCustom name="width_string"/>
                </div>
            </div>

            {!meta.error &&
            <div className={s.block}>
              <h3>Type</h3>
                {width && <SelectField label="Type"
                                       name="drawer_inserts.box_type"
                                       val={getSelectValfromVal(drawer_inserts?.box_type, drawerInsertsTypeArr)}
                                       options={drawerInsertsTypeArr}
                />}
            </div>}

            {drawer_inserts?.box_type && <div className={s.block}>
              <h3>Color</h3>
              <SelectField label="Type"
                           name="drawer_inserts.color"
                           val={getSelectValfromVal(drawer_inserts?.color, drawerInsertsColorArr)}
                           options={drawerInsertsColorArr}
              />
            </div>}

            {showLetters && <div className={s.block}>
              <h3>Inserts Type</h3>
              <SelectField label="Type"
                           name="drawer_inserts.insert_type"
                           val={getSelectValfromVal(drawer_inserts?.insert_type ?? undefined, drawerInsertsLettersFiltered)}
                           options={drawerInsertsLettersFiltered}
              />
            </div>}
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
}
;

export default CustomPartDrawerInserts;