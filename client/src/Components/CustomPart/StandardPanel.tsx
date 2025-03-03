import React, {FC} from 'react';
import {CustomPart} from "../../helpers/productTypes";
import {MaterialsFormType} from "../../common/MaterialsForm";
import {getStandardPanelPriceRange} from "../../helpers/calculatePrice";
import s from "../Product/product.module.sass";
import {ProductRadioInputCustom} from "../../common/Form";

const StandardPanel: FC<{ product: CustomPart, materials: MaterialsFormType }> = ({product, materials}) => {
    const {id} = product;
    const {door_type, door_color} = materials
    const is_price_type_default = door_type === 'Standard White Shaker' && door_color === 'Default White';
    const priceData = getStandardPanelPriceRange(id);

    const widthRange: number[] = [...new Set<number>(priceData.map(el => el.width))];
    const heightRange: number[] = [...new Set<number>(priceData.map(el => el.height))];
    console.log(widthRange)
    return (
        <>
            <div className={s.block}>
                <h3>Width</h3>
                <div className={s.options}>
                    {widthRange.map((w, index) => <ProductRadioInputCustom key={index}
                                                                           name={'Width'}
                                                                           value={w}/>)}
                </div>
            </div>
            <div className={s.block}>
                <h3>Height</h3>
                <div className={s.options}>
                    {heightRange.map((w, index) => <ProductRadioInputCustom key={index}
                                                                            name={'Height'}
                                                                            value={w}/>)}
                </div>
            </div>
        </>
    );
};

export default StandardPanel;