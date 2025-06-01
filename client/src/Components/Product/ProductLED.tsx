import React, {FC, useEffect} from 'react';
import s from "./product.module.sass";
import {ProductCheckboxInput, ProductInputCustom} from "../../common/Form";
import SelectField, {optionType} from "../../common/SelectField";
import {alignmentOptions} from "./ProductSchema";
import {MaybeEmpty, ProductFormType} from "../../helpers/productTypes";
import {useFormikContext} from "formik";
import {retry} from "@reduxjs/toolkit/query";

export type borderType = 'Sides' | 'Top' | 'Bottom';
export type ledAlignmentType = 'Center' | 'From Face' | 'From Back';
export type ledType = {
    hasLedBlock: boolean
}
const ProductLED: FC<ledType> = ({hasLedBlock}) => {
    const {values, setFieldValue, errors} = useFormikContext<ProductFormType>();
    const {
        'LED borders': ledBorders,
        'LED alignment': ledAlignment,
        'LED indent': ledIndent
    } = values;
    const borderOptions = ['Sides', 'Top', 'Bottom']
    const alignmentOpt: optionType[] = alignmentOptions.map(el => ({value: el, label: el}));
    const isIndentShown = isShowIndent(ledAlignment, ledBorders);

    useEffect(() => {
        const isIndentShown = isShowIndent(ledAlignment, ledBorders);
        if (ledBorders.length && !ledAlignment) {
            setFieldValue('LED alignment', 'Center');
        }
        if (!ledBorders.length && ledAlignment) {
            setFieldValue('LED alignment', '');
            setFieldValue('LED indent', '');
        }
        if (!isIndentShown && ledIndent) setFieldValue('LED indent', '');
    }, [ledBorders, ledAlignment, ledIndent])
    if (!hasLedBlock) return null;
    return (
        <div className={s.block}>
            <h3>LED</h3>
            <div className={s.led}>
                <div className={s.options}>
                    {borderOptions.map((b, index) => <ProductCheckboxInput key={index}
                                                                           inputIndex={index}
                                                                           name={'LED borders'}
                                                                           value={b}/>)}
                </div>
                {ledBorders.length ? <SelectField name="LED alignment" val={{value: ledAlignment, label: ledAlignment}}
                                                  options={alignmentOpt}/> : null}
                {isIndentShown ? <ProductInputCustom name={'LED indent'} label="Indent"/> : null}
            </div>
        </div>
    );
};

export default ProductLED;


const isShowIndent = (ledAlignment:MaybeEmpty<ledAlignmentType>, ledBorders:string[]):boolean => {
    if (!ledBorders.length) return false;
    return !!(ledAlignment && ledAlignment !== 'Center')
}