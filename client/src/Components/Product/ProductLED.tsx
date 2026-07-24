import React, {FC, useEffect} from 'react';
import s from "./product.module.sass";
import {ProductCheckboxBoolean, ProductCheckboxInput, ProductInputCustom, ProductOptionsInput} from "../../common/Form";
import SelectField, {optionType} from "../../common/SelectField";
import {alignmentOptions} from "./ProductSchema";
import {LEDType, MaybeEmpty} from "../../helpers/productTypes";
import {useField} from "formik";
import {getBorderOptionsById, ledEmpty} from "../../helpers/helpers";

const borderArr = ['Sides', 'Top', 'Bottom', 'Bottom Inside', 'Bottom Outside', 'LED Panel', 'LED Shelf'] as const;
export type BorderType = typeof borderArr[number];
export type ledAlignmentType = 'Center' | 'From Face' | 'From Back';

const ProductLED: FC<{id:number}> = ({id}) => {
    const [field, {error}, {setValue}] = useField<LEDType>('led');
    const borderOptions = getBorderOptionsById(id);
    const {value: {border, indent_string, alignment}} = field;
    const alignmentOpt: optionType[] = alignmentOptions.map(el => ({value: el, label: el}));
    const isAlignmentShown = !!border.length;
    const isIndentShown = isShowIndent(alignment, isAlignmentShown);
    useEffect(() => {
        if (isAlignmentShown && !alignment) setValue({...field.value, alignment: 'Center'});
        if ((!isAlignmentShown && alignment)) setValue(ledEmpty);
        if ((!isIndentShown && indent_string)) setValue({...field.value, indent_string: ''});
    }, [field.value]);

    return (
        <div className={s.block}>
            {![901,903].includes(id) && <h3>LED</h3>}
            <div className={s.led}>
                <div className={s.options}>
                    {borderOptions.map((b, index) => <ProductCheckboxInput key={index}
                                                                           inputIndex={index}
                                                                           name={'led.border'}
                                                                           value={b}/>)}
                </div>
                {isAlignmentShown ? <SelectField name="led.alignment" val={{value: alignment, label: alignment}}
                                                 options={alignmentOpt}/> : null}
                {isIndentShown ? <ProductInputCustom name={'led.indent_string'} label="Indent"/> : null}
            </div>
        </div>
    );
};

export default ProductLED;


const isShowIndent = (alignment: MaybeEmpty<ledAlignmentType>, isAlignmentShown: boolean): boolean => {
    if (!isAlignmentShown) return false;
    return !!(alignment && alignment !== 'Center')
}