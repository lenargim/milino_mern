import React, {FC} from 'react';
import {Form, useFormikContext} from 'formik';
import {CustomPartType} from "../../helpers/productTypes";
import {CustomPartFormType} from "./CustomPart";
import s from "../Product/product.module.sass";
import {ProductInputCustom, TextInput} from "../../common/Form";
import CustomPartGlassDoorBlock from "./CustomPartGlassDoorBlock";
import CustomPartSubmit from "./CustomPartSubmit";
import CustomPartMaterialsArray from "./CustomPartMaterialsArray";

const CustomPartGlassDoorForm: FC<{product:CustomPartType}> = ({product}) => {
    const {values} = useFormikContext<CustomPartFormType>();
    const {
        glass_door,
        price
    } = values;
    const {id} = product;

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
            <CustomPartMaterialsArray product={product} isStandardCabinet={false} />
            <CustomPartGlassDoorBlock glass_door={glass_door} is_custom={true} product_id={id}/>

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

export default CustomPartGlassDoorForm;