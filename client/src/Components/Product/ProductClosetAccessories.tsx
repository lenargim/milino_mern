import React, {FC, useEffect, useState} from 'react';
import s from "./product.module.sass";
import SelectField, {optionType} from "../../common/SelectField";
import {closetAccessoriesNames, ClosetAccessoriesTypes, ProductFormType} from "../../helpers/productTypes";
import {useFormikContext} from "formik";
import {prepareToSelectField} from "../../helpers/helpers";

export type borderType = 'Sides' | 'Top' | 'Bottom';
export type ledAlignmentType = 'Center' | 'From Face' | 'From Back';

const ProductClosetAccessories: FC = () => {
    const {values, setFieldValue} = useFormikContext<ProductFormType>();
    const {
        custom
    } = values;
    const {width, custom_width} = values
    const optionEmpty: optionType = {value: '', label: 'Without additional accessories'};
    const [validOptions, setValidOptions] = useState<ClosetAccessoriesTypes[]>([...closetAccessoriesNames])
    const optionsArr = prepareToSelectField([optionEmpty, ...validOptions]);
    useEffect(() => {
        const w = width || custom_width
        if (w > 30) {
            setValidOptions([...closetAccessoriesNames].filter(el => el !== 'Pant Rack'))
            values.custom?.closet_accessories === 'Pant Rack' && setFieldValue('custom.closet_accessories', '')
        } else {
            setValidOptions([...closetAccessoriesNames])
        }
    }, [width,custom_width])

    return (
        <div className={s.block}>
            <h3>Closet Accessories</h3>
            <SelectField name="custom.closet_accessories" val={{
                value: custom?.closet_accessories || optionEmpty.value,
                label: custom?.closet_accessories || optionEmpty.label
            }}
                         options={optionsArr}/>
        </div>
    );
};

export default ProductClosetAccessories;
