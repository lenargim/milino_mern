import React, {FC, useEffect} from 'react';
import s from "./product.module.sass";
import {ProductInputCustom} from "../../common/Form";
import {MaybeUndefined} from "../../helpers/productTypes";
import {useField} from "formik";
import {getFraction} from "../../helpers/helpers";

const ProductFarmSink:FC<{farm_sink_height: MaybeUndefined<number>}> = ({farm_sink_height}) => {
    const [{value}, meta, {setValue}] = useField('farm_sink_height_string');
    useEffect(() => {
        if (!value) setValue(getFraction(farm_sink_height || 0), true)
    }, [])
    return (
        <div className={s.block}>
            <h3>Farm Sink Height</h3>
            <ProductInputCustom name="farm_sink_height_string"/>
        </div>
    );
};

export default ProductFarmSink;