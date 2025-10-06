import React, {FC, useEffect} from 'react';
import s from "./product.module.sass";
import {ProductCheckboxInput, ProductInputCustom} from "../../common/Form";
import SelectField, {optionType} from "../../common/SelectField";
import {alignmentOptions} from "./ProductSchema";
import {MaybeEmpty, ProductFormType} from "../../helpers/productTypes";
import {useFormikContext} from "formik";

export type borderType = 'Sides' | 'Top' | 'Bottom';
export type ledAlignmentType = 'Center' | 'From Face' | 'From Back';

const ProductLED: FC = () => {
    const {values, setFieldValue} = useFormikContext<ProductFormType>();
    const {
        led_borders,
        led_alignment,
        led_indent_string
    } = values;
    const borderOptions = ['Sides', 'Top', 'Bottom']
    const alignmentOpt: optionType[] = alignmentOptions.map(el => ({value: el, label: el}));
    const isIndentShown = isShowIndent(led_alignment, led_borders);

    useEffect(() => {
        const isIndentShown = isShowIndent(led_alignment, led_borders);
        if (led_borders.length && !led_alignment) {
            setFieldValue('led_alignment', 'Center');
        }
        if (!led_borders.length && led_alignment) {
            setFieldValue('led_alignment', '');
            setFieldValue('led_indent_string', '');
        }
        if (!isIndentShown && led_indent_string) setFieldValue('led_indent_string', '');
    }, [led_borders, led_alignment, led_indent_string])

    return (
        <div className={s.block}>
            <h3>LED</h3>
            <div className={s.led}>
                <div className={s.options}>
                    {borderOptions.map((b, index) => <ProductCheckboxInput key={index}
                                                                           inputIndex={index}
                                                                           name={'led_borders'}
                                                                           value={b}/>)}
                </div>
                {led_borders.length ? <SelectField name="led_alignment" val={{value: led_alignment, label: led_alignment}}
                                                  options={alignmentOpt}/> : null}
                {isIndentShown ? <ProductInputCustom name={'led_indent_string'} label="Indent"/> : null}
            </div>
        </div>
    );
};

export default ProductLED;


const isShowIndent = (led_alignment:MaybeEmpty<ledAlignmentType>, led_borders:string[]):boolean => {
    if (!led_borders.length) return false;
    return !!(led_alignment && led_alignment !== 'Center')
}