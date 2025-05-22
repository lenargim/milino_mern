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
    ProductType, productValuesType
} from "../../helpers/productTypes";
import ProductOptionsBlock from "./ProductOptionsBlock";
import ProductHingeBlock from "./ProductHingeBlock";
import ProductCornerBlock from "./ProductCornerBlock";
import {
    getHeightRange,
    isShowBlindWidthBlock,
    isShowMiddleSectionBlock
} from "../../helpers/helpers";
import ProductLED from "./ProductLED";

export type CabinetFormType = {
    product: ProductType,
    productRange: productRangeType,
    productPriceData: productDataToCalculatePriceType,
    hingeArr: string[],
    tablePriceData: pricePart[]
}
const ProductLayout: FC<CabinetFormType> = ({
                                                product,
                                                productRange,
                                                productPriceData,
                                                hingeArr,
                                                tablePriceData
                                            }) => {
    const {hasSolidWidth, hasMiddleSection, middleSectionDefault, isAngle, isCornerChoose, hasLedBlock, blindArr, isProductStandard, product_type, id, category, customHeight, attributes} = product;
    const {values} = useFormikContext<productValuesType>();
    const {widthRange, heightRange, depthRange} = productRange;

    const {filteredOptions} = productPriceData;
    const {
        Width: width,
        Height: height,
        Depth: depth,
        'Blind Width': blindWidth,
        'LED alignment': ledAlignment,
        price
    } = values;

    const widthRangeWithCustom = !isProductStandard ?widthRange.concat([0]) : widthRange;
    const heightRangeWithCustom = getHeightRange(heightRange, isProductStandard, width, tablePriceData, category,customHeight)
    const depthRangeWithCustom = depthRange.concat([0]);
    const showBlindWidthBlock = isShowBlindWidthBlock(blindArr,product_type)
    const showMiddleSectionBlock = isShowMiddleSectionBlock(hasMiddleSection,middleSectionDefault,isProductStandard);
    return (
        <Form>
            {!hasSolidWidth ?
                <div className={s.block}>
                    <h3>Width</h3>
                    <div className={s.options}>
                        {widthRangeWithCustom.map((w, index) => <ProductRadioInputCustom key={index}
                                                                                         name={'Width'}
                                                                                         value={w}/>)}
                        {!width && <ProductInputCustom  name={'Custom Width'}/>}
                    </div>
                </div> : null}
            {showBlindWidthBlock ?
                <div className={s.block}>
                    <h3>Blind width</h3>
                    <div className={s.options}>
                        {blindArr && blindArr.map((w, index) => <ProductRadioInputCustom key={index}
                                                                             name={'Blind Width'}
                                                                             value={w}/>)}
                        {!blindWidth && <ProductInputCustom name={'Custom Blind Width'}/>}
                    </div>
                </div> : null
            }
            <div className={s.block}>
                <h3>Height</h3>
                <div className={s.options}>
                    {heightRangeWithCustom.map((w, index) => <ProductRadioInputCustom key={index}
                                                                                      name={'Height'}
                                                                                      value={w}/>)}
                    {!height && <ProductInputCustom name={'Custom Height'}/>}
                </div>
            </div>
            <div className={s.divider}>
                {!isAngle ?
                    <div className={s.block}>
                        <h3>Depth</h3>
                        <div className={s.options}>
                            {depthRangeWithCustom.map((w, index) => <ProductRadioInputCustom key={index}
                                                                                             name={'Depth'}
                                                                                             value={w}/>)}
                            {!depth && <ProductInputCustom name={'Custom Depth'}/>}
                        </div>
                    </div>
                    : null}
                {showMiddleSectionBlock &&
                  <div className={s.block}>
                    <h3>Cutout Height</h3>
                    <ProductInputCustom name={'Middle Section'}/>
                  </div>
                }
            </div>

            <ProductHingeBlock hingeArr={hingeArr}/>
            <ProductCornerBlock isCornerChoose={isCornerChoose}/>
            <ProductLED alignment={ledAlignment} hasLedBlock={hasLedBlock}/>
            <ProductOptionsBlock filteredOptions={filteredOptions}
                                 isProductStandard={isProductStandard}
                                 id={id}
                                 attributes={attributes}
            />

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

export default ProductLayout;