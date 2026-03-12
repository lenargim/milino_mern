import React, {FC} from 'react';
import s from "../Product/product.module.sass";
import {useField} from "formik";
import {CustomPartAttrCheckbox, ProductInputCustom, ProductRadioInput} from "../../common/Form";

const CustomPartHingeHoles: FC = () => {
    const arrTypes = ['Hinges', 'Holes Only']

    const [{value: add_hinges_or_holes_value}, , ] = useField('add_hinges_or_holes');
    const [{value: add_hinges_or_holes_type}, , {setValue}] = useField('add_hinges_or_holes_type');

    if (add_hinges_or_holes_value && !add_hinges_or_holes_type) setValue(arrTypes[0])

    return (
        <div className={s.blockWithGaps}>
            <CustomPartAttrCheckbox className={s.butonFlexLeft} label="Add Hinges or Hinge holes" name="add_hinges_or_holes"/>
            {add_hinges_or_holes_value &&
            <>
              <div className={s.options}>
                  {arrTypes.map((el, index) => <ProductRadioInput key={index} name="add_hinges_or_holes_type"
                                                             value={el}/>)}
              </div>
              <div className={s.titleAndCustomInputBlock}>
                <label htmlFor="add_hinges_or_holes_top">From top</label>
                <ProductInputCustom name="add_hinges_or_holes_top" label="Example 4"/>
              </div>
              <div className={s.titleAndCustomInputBlock}>
                <label htmlFor="add_hinges_or_holes_bottom">From bottom</label>
                <ProductInputCustom name="add_hinges_or_holes_bottom" label="Example 4"/>
              </div>
            </>
            }
        </div>
    );
};

export default CustomPartHingeHoles;