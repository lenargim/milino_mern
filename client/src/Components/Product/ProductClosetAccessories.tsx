import React, {FC} from 'react';
import s from "./product.module.sass";
import SelectField, {optionType} from "../../common/SelectField";
import {closetAccessoriesNames, ProductFormType} from "../../helpers/productTypes";
import {useFormikContext} from "formik";
import {prepareToSelectField} from "../../helpers/helpers";

export type borderType = 'Sides' | 'Top' | 'Bottom';
export type ledAlignmentType = 'Center' | 'From Face' | 'From Back';

const ProductClosetAccessories: FC = () => {
    const {values, setFieldValue, errors} = useFormikContext<ProductFormType>();
    const {
        custom
    } = values;

    const optionEmpty: optionType = {value: '', label: 'Without additional accessories'};

    const options = [optionEmpty, ...closetAccessoriesNames];
    const optionsArr = prepareToSelectField(options);

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
