import React, {FC} from 'react';
import {CustomPartType,} from "../../helpers/productTypes";
import {
    filterCustomPartsMaterialsArray,
} from "../../helpers/helpers";
import s from "../Product/product.module.sass";
import {ProductRadioInput} from "../../common/Form";

type CustomPartMaterialsArray = {
    product: CustomPartType,
    isStandardCabinet: boolean
}

const CustomPartMaterialsArray: FC<CustomPartMaterialsArray> = ({product, isStandardCabinet}) => {
    const {materials_array, id} = product;
    const filtered_materials_array = filterCustomPartsMaterialsArray(materials_array, id, isStandardCabinet);
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