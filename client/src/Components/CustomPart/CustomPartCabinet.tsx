import React, {FC, useEffect} from 'react';
import {Form, useFormikContext} from 'formik';
import {CustomPartType} from "../../helpers/productTypes";
import {CustomPartFormType} from "./CustomPart";
import s from "../Product/product.module.sass";
import {ProductInputCustom, TextInput} from "../../common/Form";
import CustomPartSubmit from "./CustomPartSubmit";
import CustomPartMaterialsArray from "./CustomPartMaterialsArray";
import {isLedBlock, isShowShelvesBlock} from "../../helpers/helpers";
import CustomPartShelvesBlock from "./CustomPartShelvesBlock";
import ProductLED from "../Product/ProductLED";

type CustomPartCabinet = {
    product: CustomPartType,
    isDepthIsConst: boolean,
    isStandardCabinet: boolean
}

const CustomPartCabinet: FC<CustomPartCabinet> = ({product, isStandardCabinet}) => {
    const {values, setFieldValue, errors} = useFormikContext<CustomPartFormType>();
    const {
        material,
        depth,
        price
    } = values;
    const {materials_array, id} = product;

    useEffect(() => {
        const new_depth = materials_array && materials_array.find(el => el.name === material)?.depth;
        if (new_depth && depth !== new_depth) setFieldValue('depth', new_depth);
    }, [material])

    const showLedBlock = isLedBlock(id)
    const showShelvesBlock = isShowShelvesBlock(product.id)
    return (
        <Form>
            <div className={s.block}>
                <h3>Width</h3>
                <div className={s.options}>
                    <ProductInputCustom name="width_string"/>
                </div>
            </div>
            <div className={s.block}>
                <h3>Height</h3>
                <div className={s.options}>
                    <ProductInputCustom name="height_string"/>
                </div>
            </div>
            <div className={s.block}>
                <h3>Depth</h3>
                <div className={s.options}>
                    <ProductInputCustom name="depth_string"/>
                </div>
            </div>
            {showShelvesBlock ? <CustomPartShelvesBlock /> : null}
            {showLedBlock ? <ProductLED id={id} /> : null}
            <CustomPartMaterialsArray product={product} isStandardCabinet={isStandardCabinet} />
            <div className={s.block}>
                <TextInput type={"text"} label={'Note'} name="note"/>
            </div>
            <div className={s.total}>
                <span>Total: </span>
                <span>{price}$</span>
            </div>
            <CustomPartSubmit/>
        </Form>
    );
};

export default CustomPartCabinet;