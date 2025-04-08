import React, {FC} from 'react';
import {Form, useFormikContext} from "formik";
import {
    ProductInputCustom,
    ProductRadioInputCustom,
    TextInput
} from "../../common/Form";
import s from './product.module.sass'
import {
    productDataToCalculatePriceType,
    productRangeType,
    ProductType
} from "../../helpers/productTypes";

import LedBlock from "./LED";
import OptionsBlock from "./OptionsBlock";
import HingeBlock from "./HingeBlock";
import CornerBlock from "./CornerBlock";
import {isShowBlindWidthBlock, isShowMiddleSectionBlock, productValuesType} from "../../helpers/helpers";

export type CabinetFormType = {
    product: ProductType,
    productRange: productRangeType,
    productPriceData: productDataToCalculatePriceType,
    hingeArr: string[]
}
const CabinetLayOut: FC<CabinetFormType> = ({
                                                product,
                                                productRange,
                                                productPriceData,
                                                hingeArr,
                                            }) => {
    const {hasSolidWidth, hasMiddleSection, middleSectionDefault, isAngle, isCornerChoose, hasLedBlock, blindArr, isProductStandard, product_type} = product;
    const {values} = useFormikContext<productValuesType>();
    const {widthRange, heightRange, depthRange} = productRange;
    const widthRangeWithCustom = !isProductStandard ?widthRange.concat([0]) : widthRange;
    const heightRangeWithCustom = !isProductStandard ? heightRange.concat([0]) : heightRange;
    const depthRangeWithCustom = depthRange.concat([0]);
    const {filteredOptions} = productPriceData;
    const {
        Width: width,
        Height: height,
        Depth: depth,
        'Blind Width': blindWidth,
        Options: chosenOptions,
        'LED alignment': ledAlignment,
        ['Door Profile']: doorProfile,
        ['Door Glass Type']: doorGlassType,
        ['Door Glass Color']: doorGlassColor,
        ['Shelf Profile']: shelfProfile,
        ['Shelf Glass Type']: shelfGlassType,
        ['Shelf Glass Color']: shelfGlassColor,
        price
    } = values;

    const showBlindWidthBlock = isShowBlindWidthBlock(blindArr,product_type)
    const showMiddleSectionBlock = isShowMiddleSectionBlock(hasMiddleSection,middleSectionDefault,isProductStandard);
    // const {errors} = useFormikContext();
    // console.log(errors)
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

            <HingeBlock hingeArr={hingeArr}/>
            <CornerBlock isCornerChoose={isCornerChoose}/>

            <LedBlock alignment={ledAlignment} hasLedBlock={hasLedBlock}/>
            <OptionsBlock filteredOptions={filteredOptions} chosenOptions={chosenOptions}
                          doorProfile={doorProfile} doorGlassType={doorGlassType}
                          doorGlassColor={doorGlassColor} shelfProfile={shelfProfile}
                          shelfGlassType={shelfGlassType} shelfGlassColor={shelfGlassColor}
                          isProductStandard={isProductStandard}/>

            <div className={s.block}>
                <TextInput type={"text"} label={'Note'} name="Note"/>
            </div>
            <div className={s.total}>
                <span>Total: </span>
                <span>{price}$</span>
            </div>
            <button
                type="submit"
                className={['button yellow'].join(' ')}
            >Add to cart
            </button>
        </Form>
    );
};

export default CabinetLayOut;