import React, {FC, useEffect} from 'react';
import {Form, useField, useFormikContext} from 'formik';
import {CustomPartType, ImgFieldType, itemImg} from "../../helpers/productTypes";
import {
    CustomPartFormType, DrawerInsertsBoxNames,
    DrawerInsertsColorNames,
    DrawerInsertsLetterNames,
} from "./CustomPart";
import {
    getImg,
    getSelectValfromVal, prepareToSelectField,
} from "../../helpers/helpers";
import s from "../Product/product.module.sass";
import {ProductInputCustom, RadioInputWithImage, TextInput} from "../../common/Form";
import CustomPartSubmit from "./CustomPartSubmit";
import SelectField, {optionType} from "../../common/SelectField";

type CustomPartDrawerInserts = {
    product: CustomPartType,
    isStandardCabinet: boolean
}

const filterLetterTypeByWidth = (width: number, drawerInsertsLetters: string[]): string[] => {
    if (width < 18) return drawerInsertsLetters.filter(el => ['A', 'B', 'C'].includes(el));
    if (width < 21) return drawerInsertsLetters.filter(el => ['B', 'C', 'D', 'E'].includes(el));
    if (width < 24) return drawerInsertsLetters.filter(el => ['C', 'D', 'E', 'F'].includes(el));
    if (width < 27) return drawerInsertsLetters.filter(el => ['D', 'E', 'F', 'G'].includes(el));
    if (width < 30) return drawerInsertsLetters.filter(el => ['E', 'F', 'G', 'H'].includes(el));
    if (width < 48) return drawerInsertsLetters.filter(el => ['F', 'G', 'H', 'I'].includes(el));
    return []
}

const prepareToImgField = (arr: string[], color: string = ''): ImgFieldType[] => {
    return arr.map(el => ({
        value: el,
        img: `Type ${el} ${color}.jpg`
    }))
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
        // const drawerInsertsLetters = prepareToSelectField([...DrawerInsertsLetterNames]);

        const drawerInsertsLettersFiltered = filterLetterTypeByWidth(width, [...DrawerInsertsLetterNames]);
        const drawerInsertsLettersImaged = prepareToImgField(drawerInsertsLettersFiltered, drawer_inserts?.color)
        const showType = !meta.error;
        const showMaterial = showType && drawer_inserts?.box_type;
        const showLetters = showType && drawer_inserts && drawer_inserts.color && drawer_inserts.box_type === 'Inserts';

        if ((!showLetters && drawer_inserts?.insert_type) || (showLetters && drawer_inserts?.insert_type && !drawerInsertsLettersFiltered.includes(drawer_inserts.insert_type))) setFieldValue('drawer_inserts.insert_type', '');
        if (showLetters && !drawer_inserts?.insert_type) setFieldValue('drawer_inserts.insert_type', drawerInsertsLettersFiltered[0]);

        return (
            <Form>
                <div className={s.block}>
                    <h3>Width</h3>
                    <div className={s.options}>
                        <ProductInputCustom name="width_string"/>
                    </div>
                </div>

                {showType &&
                <div className={s.block}>
                  <h3>Type</h3>
                    {width && <SelectField label="Type"
                                           name="drawer_inserts.box_type"
                                           val={getSelectValfromVal(drawer_inserts?.box_type, drawerInsertsTypeArr)}
                                           options={drawerInsertsTypeArr}
                    />}
                </div>}

                {showMaterial && <div className={s.block}>
                  <h3>Material</h3>
                  <SelectField label="Material"
                               name="drawer_inserts.color"
                               val={getSelectValfromVal(drawer_inserts?.color, drawerInsertsColorArr)}
                               options={drawerInsertsColorArr}
                  />
                </div>}

                {showLetters && <div className={s.block}>
                  <h3>Inserts Type</h3>
                  <div className={s.optionsWithImage}>
                      {drawerInsertsLettersImaged.map((el, index) => <RadioInputWithImage key={index}
                                                                                       name="drawer_inserts.insert_type"
                                                                                       value={el.value}
                                                                                       label={el.value}
                                                                                       img={getImg('drawer_inserts', el.img)}
                          />
                      )}
                  </div>
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