import React, {FC, useEffect} from 'react';
import {Form, useFormikContext} from 'formik';
import {CustomPartType} from "../../helpers/productTypes";
import {CustomPartFormType} from "./CustomPart";
import {
    filterCustomPartsMaterialsArray, getImg,
} from "../../helpers/helpers";
import s from "../Product/product.module.sass";
import {
    CustomPartAttrCheckbox,
    ProductCheckboxInput,
    ProductInputCustom, ProductOptionsInput,
    ProductRadioInput,
    RadioInputGroove,
    TextInput
} from "../../common/Form";
import CustomPartSubmit from "./CustomPartSubmit";
import materialsAPI from './../../api/materials.json'
import {materialsData} from "../../helpers/roomTypes";

type CustomPartRibbed = {
    product: CustomPartType,
    isStandardCabinet: boolean
}

const isShowGroove = (material: string): boolean => {
    return !!(material && material !== 'Painted');
}
let grooveArr = materialsAPI.groove as materialsData[];
grooveArr = grooveArr.map(el => ({...el, img: getImg('materials/groove', el.img)}));

const CustomPartRibbed: FC<CustomPartRibbed> = ({product, isStandardCabinet}) => {
        const {values, setFieldValue} = useFormikContext<CustomPartFormType>();
        const {
            groove,
            material,
            price
        } = values;
        const {materials_array, id} = product;
        const filtered_materials_array = filterCustomPartsMaterialsArray(materials_array, id, isStandardCabinet)
        const showGroove = isShowGroove(material);

        useEffect(() => {
            if (groove?.style && material === 'Painted') setFieldValue('groove.style', '')
            if (showGroove && !groove?.style) setFieldValue('groove.style', grooveArr[0].value)
        }, [material])

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

                {filtered_materials_array &&
                <div className={s.block}>
                  <h3>Material</h3>
                  <div className={s.optionsGroove}>
                      {filtered_materials_array.map((m, index) => <RadioInputGroove key={index}
                                                                                    name="material" value={m.name}
                                                                                    img={getImg('materials/door_finish_material', m.img)}/>)}
                  </div>
                </div>
                }
                {
                    showGroove && <div className={s.block}>
                      <h3>Groove Styles</h3>
                      <div className={s.optionsGroove}>
                          {grooveArr.map((el, index) => <RadioInputGroove key={index} name="groove.style" value={el.value}
                                                                          label={el.label} img={el.img}/>)}
                      </div>
                    </div>
                }

                <div className={s.block}>
                    <h3>Clear Coat</h3>
                    <div className={s.optionsGroove}>
                        <CustomPartAttrCheckbox label="Clear Coat" name="groove.clear_coat"/>
                    </div>
                </div>


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
    }
;

export default CustomPartRibbed;