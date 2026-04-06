import React, {FC, useEffect} from 'react';
import s from "./product.module.sass";
import {ProductCheckboxInput, ProductInputCustom} from "../../common/Form";
import SelectField, {optionType} from "../../common/SelectField";
import {alignmentOptions} from "./ProductSchema";
import {LEDType, MaybeEmpty} from "../../helpers/productTypes";
import {useField} from "formik";
import {ledEmpty} from "../../helpers/helpers";

export type borderType = 'Sides' | 'Top' | 'Bottom';
export type ledAlignmentType = 'Center' | 'From Face' | 'From Back';

const ProductLED: FC = () => {
    const [field, meta, {setValue}] = useField<LEDType>('led');
    const borderOptions = ['Sides', 'Top', 'Bottom']
    const {value: {border, indent_string, alignment}} = field;
    const alignmentOpt: optionType[] = alignmentOptions.map(el => ({value: el, label: el}));
    const isIndentShown = isShowIndent(alignment, border);
    useEffect(() => {
        const isIndentShown = isShowIndent(alignment, border);
        if (border.length && !alignment) {
            setValue({...field.value, alignment: 'Center'});
        }
        if (!border.length && alignment) setValue(ledEmpty);
        if (!isIndentShown && indent_string) setValue({...field.value, indent_string: ''});
    }, [alignment, border, indent_string])

    return (
        <div className={s.block}>
            <h3>LED</h3>
            <div className={s.led}>
                <div className={s.options}>
                    {borderOptions.map((b, index) => <ProductCheckboxInput key={index}
                                                                           inputIndex={index}
                                                                           name={'led.border'}
                                                                           value={b}/>)}
                </div>
                {border.length ? <SelectField name="led.alignment" val={{value: alignment, label: alignment}}
                                              options={alignmentOpt}/> : null}
                {isIndentShown ? <ProductInputCustom name={'led.indent_string'} label="Indent"/> : null}
            </div>
        </div>
    );
};

export default ProductLED;


const isShowIndent = (alignment: MaybeEmpty<ledAlignmentType>, border: string[]): boolean => {
    if (!border.length) return false;
    return !!(alignment && alignment !== 'Center')
}