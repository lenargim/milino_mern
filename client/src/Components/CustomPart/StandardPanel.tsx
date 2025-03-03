import React, {FC, useEffect, useState} from 'react';
import {CustomPartType, pricePartStandardPanel} from "../../helpers/productTypes";
import {MaterialsFormType} from "../../common/MaterialsForm";
import {getStandardPanelPriceRange} from "../../helpers/calculatePrice";
import s from "../Product/product.module.sass";
import {ProductRadioInputStandardCustom, TextInput} from "../../common/Form";
import {Form, useFormikContext} from "formik";
import {CustomPartFormValuesType} from "./CustomPart";
import {getNewPriceFromPricePart} from "../../helpers/helpers";


const StandardPanel: FC<{ product: CustomPartType, materials: MaterialsFormType }> = ({product, materials}) => {
    const {values, setFieldValue} = useFormikContext<CustomPartFormValuesType>();
    const {'Width Number': width, 'Height Number': height, 'Depth Number': depth , price} = values
    const {id} = product;
    const {door_type, door_color} = materials
    const is_price_type_default = door_type === 'Standard White Shaker' && door_color === 'Default White';
    const priceData = getStandardPanelPriceRange(id) || [];
    const [widthRange] = useState<number[]>([...new Set<number>(priceData ? priceData.map(el => el.width) : [])])
    const [heightRange, setHeightRange] = useState<number[]>([...new Set<number>(priceData ? priceData.map(el => el.height) : [])])
    const [depthRange, setDepthRange] = useState<number[]>([...new Set<number>(priceData ? priceData.map(el => el.depth) : [])])
    const showDepthBlock = depthRange && depthRange.length && depthRange[0] !== 0;

    useEffect(() => {
        const filteredData = priceData.filter(el => el.width === width)
        const newHeightRange = [...new Set<number>(filteredData.map(el => el.height))];
        setHeightRange(newHeightRange);
        if (height && !newHeightRange.includes(height)) {
            setFieldValue('Height Number', filteredData[0].height);
            setFieldValue('Height', filteredData[0].height.toString());
        }
    }, [width]);

    useEffect(() => {
        const filteredData = priceData.filter(el => el.height === height)
        const newDepthRange = [...new Set<number>(filteredData.map(el => el.depth))];
        setDepthRange(newDepthRange);
        if (depth && !newDepthRange.includes(depth)) {
            setFieldValue('Depth Number', filteredData[0].depth);
            setFieldValue('Depth', filteredData[0].depth.toString());
        }
    }, [height]);

    useEffect(() => {
        const pricePart = priceData.find(el => el.width === width && el.height === height && el.depth === depth);
        setFieldValue('price', getNewPriceFromPricePart(is_price_type_default, pricePart));
    }, [width, height, depth]);

    if (!priceData.length) return <div>No price</div>;

    return (
        <Form>
            <div className={s.block}>
                <h3>Width</h3>
                <div className={s.options}>
                    {widthRange.map((w, index) => <ProductRadioInputStandardCustom key={index}
                                                                                   name={'Width Number'}
                                                                                   value={w}/>)}
                </div>
            </div>
            <div className={s.block}>
                <h3>Height</h3>
                <div className={s.options}>
                    {heightRange.map((w, index) => <ProductRadioInputStandardCustom key={index}
                                                                                    name={'Height Number'}
                                                                                    value={w}/>)}
                </div>
            </div>
            {showDepthBlock ? <div className={s.block}>
                    <h3>Depth</h3>
                    <div className={s.options}>
                        {depthRange.map((w, index) => <ProductRadioInputStandardCustom key={index}
                                                                                       name={'Depth Number'}
                                                                                       value={w}/>)}
                    </div>
                </div> : null
            }
            <div className={s.block}>
                <TextInput type={"text"} label={'Note'} name="Note"/>
            </div>
            <div className={s.total}>
                <span>Total: </span>
                <span>{price}$</span>
            </div>
            <button type="submit" className={['button yellow'].join(' ')}>Add to cart</button>
        </Form>
    );
};

export default StandardPanel;