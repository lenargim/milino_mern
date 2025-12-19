import React, {FC} from 'react';
import {Form, useFormikContext} from 'formik';
import {CustomPartType} from "../../helpers/productTypes";
import {
    CustomPartFormType, DrawerRONames,
} from "./CustomPart";
import s from "../Product/product.module.sass";
import {ProductRadioInputCustom, TextInput} from "../../common/Form";
import CustomPartSubmit from "./CustomPartSubmit";
import SelectField, {optionType} from "../../common/SelectField";
import {getSelectValfromVal, prepareToSelectField} from "../../helpers/helpers";

type CustomPartRODrawer = {
    product: CustomPartType
}

const CustomPartRODrawer: FC<CustomPartRODrawer> = ({product}) => {
        const {values} = useFormikContext<CustomPartFormType>();
        const {
            price,
            drawer_accessories
        } = values;
        const {width_range} = product;
        const drawerList: optionType[] = prepareToSelectField([...DrawerRONames]);
        return (
            <Form>
                <div className={s.block}>
                    <h3>Type</h3>
                    <SelectField label="Type"
                                 name="drawer_accessories.drawer_ro"
                                 val={getSelectValfromVal(drawer_accessories?.drawer_ro, drawerList)}
                                 options={drawerList}
                    />
                </div>
                <div className={s.block}>
                    <h3>Width</h3>
                    <div className={s.options}>
                        {width_range ? width_range.map((w, index) => <ProductRadioInputCustom key={index}
                                                                                              name="width"
                                                                                              value={w}/>) : null}
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
    };

export default CustomPartRODrawer;