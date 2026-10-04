import React, {FC} from 'react';
import {materialsCustomPart, MaybeNull,} from "../../helpers/productTypes";
import s from "../Product/product.module.sass";
import {ProductRadioInput} from "../../common/Form";

type CustomPartMaterialsArrayType = {
    filtered_materials_array: MaybeNull<materialsCustomPart[]>
}

const CustomPartMaterialsArray: FC<CustomPartMaterialsArrayType> = ({filtered_materials_array}) => {
    if (!filtered_materials_array) return null;
    return (
        <div className={s.block}>
            <h3>Material</h3>
            <div className={s.options}>
                {filtered_materials_array.map((m, index) => <ProductRadioInput key={index}
                                                                               name="material"
                                                                               value={m.name}/>)}
            </div>
        </div>
    );
};

export default CustomPartMaterialsArray;