import React, {FC} from 'react';
import {Form, useFormikContext} from "formik";
import {
    ProductInputCustom,
    ProductRadioInputCustom,
    TextInput
} from "../../common/Form";
import s from './product.module.sass'
import {
    pricePart,
    productDataToCalculatePriceType,
    productRangeType,
    ProductType, ProductFormType, ProductTableDataType
} from "../../helpers/productTypes";
import ProductOptionsBlock from "./ProductOptionsBlock";
import ProductHingeBlock from "./ProductHingeBlock";
import ProductCornerBlock from "./ProductCornerBlock";
import {
    getHeightRange,
    isShowBlindWidthBlock, isShowHingeBlock,
    isShowMiddleSectionBlock
} from "../../helpers/helpers";
import ProductLED from "./ProductLED";
import {useParams} from "react-router-dom";

export type CabinetFormType = {
    product: ProductType,
    hingeArr: string[],
    productData: ProductTableDataType
}
const ProductLayout: FC<CabinetFormType> = ({
                                                product,
                                                hingeArr,
                                                productData
                                            }) => {
    const {
        hasSolidWidth,
        middleSectionDefault,
        isAngle,
        isCornerChoose,
        hasLedBlock,
        blindArr,
        product_type,
        id,
        category,
        customHeight,
        attributes
    } = product;
    const {productPriceData, tablePriceData, widthRange, heightRange, depthRange} = productData
    const {cartId} = useParams();
    const buttonText = !cartId ? 'Add to cart' : 'Update Product'
    const {values, isSubmitting} = useFormikContext<ProductFormType>();

    const {filteredOptions} = productPriceData;
    const {
        width,
        height,
        depth,
        blind_width,
        price
    } = values;

    const widthRangeWithCustom = product_type === "standard" ? widthRange : widthRange.concat([0]);
    const heightRangeWithCustom = getHeightRange(heightRange, product_type === "standard", width, tablePriceData, category, customHeight)
    const depthRangeWithCustom = depthRange.concat([0]);
    const showBlindWidthBlock = isShowBlindWidthBlock(blindArr, product_type)
    const showMiddleSectionBlock = isShowMiddleSectionBlock(middleSectionDefault, product_type === "standard");
    const showHingeBlock = isShowHingeBlock(hingeArr)
    return (
        <Form>
            {!hasSolidWidth ?
                <div className={s.block}>
                    <h3>Width</h3>
                    <div className={s.options}>
                        {widthRangeWithCustom.map((w, index) => <ProductRadioInputCustom key={index}
                                                                                         name={'width'}
                                                                                         value={w}/>)}
                        {!width && <ProductInputCustom name="custom_width_string"/>}
                    </div>
                </div> : null}
            {showBlindWidthBlock ?
                <div className={s.block}>
                    <h3>Blind width</h3>
                    <div className={s.options}>
                        {blindArr && blindArr.map((w, index) => <ProductRadioInputCustom
                            key={index}
                            name={'blind_width'}
                            value={w}
                        />)}
                        {!blind_width && <ProductInputCustom name="custom_blind_width_string"/>}
                    </div>
                </div> : null
            }
            <div className={s.block}>
                <h3>Height</h3>
                <div className={s.options}>
                    {heightRangeWithCustom.map((w, index) => <ProductRadioInputCustom key={index}
                                                                                      name={'height'}
                                                                                      value={w}/>)}
                    {!height && <ProductInputCustom name="custom_height_string"/>}
                </div>
            </div>
            <div className={s.divider}>
                {!isAngle ?
                    <div className={s.block}>
                        <h3>Depth</h3>
                        <div className={s.options}>
                            {depthRangeWithCustom.map((w, index) => <ProductRadioInputCustom key={index}
                                                                                             name={'depth'}
                                                                                             value={w}/>)}
                            {!depth && <ProductInputCustom name="custom_depth_string"/>}
                        </div>
                    </div>
                    : null}
                {showMiddleSectionBlock &&
                <div className={s.block}>
                  <h3>Cutout Height</h3>
                  <ProductInputCustom name="middle_section_string"/>
                </div>
                }
            </div>

            {showHingeBlock ? <ProductHingeBlock hingeArr={hingeArr}/> : null}
            <ProductCornerBlock isCornerChoose={isCornerChoose}/>
            {hasLedBlock ? <ProductLED/> : null}
            <ProductOptionsBlock filteredOptions={filteredOptions}
                                 isProductStandard={product_type === "standard"}
                                 id={id}
                                 attributes={attributes}
            />

            <div className={s.block}>
                <TextInput type={"text"} label={'Note'} name="note"/>
            </div>
            <div className={s.total}>
                <span>Total: </span>
                <span>{price}$</span>
            </div>
            <button type="submit" className={['button yellow'].join(' ')} disabled={isSubmitting}>{buttonText}</button>
        </Form>
    );
};

export default ProductLayout;