import React, { FC } from "react";
import s from "../Product/product.module.sass";
import { useFormikContext } from "formik";
import {ProductRadioInput} from "../../common/Form";
import { CustomPartFormType } from "./CustomPart";
import {useFormikDefault} from "../../utils/customHooks";
import {CustomPartDoublePanel} from "../../helpers/Enums";

const CustomPartCutoutBlock: FC = () => {
    const { values } = useFormikContext<CustomPartFormType>();
    const double_panel = values.panel_accessories.double_panel;

    useFormikDefault(double_panel, "panel_accessories.double_panel", CustomPartDoublePanel["0"]);

    const arrTypes = Object.values(CustomPartDoublePanel);
    return (
        <div className={s.blockWithGaps}>
            <div className={s.options}>
                {arrTypes.map((el, index) => (
                    <ProductRadioInput
                        key={index}
                        name="panel_accessories.double_panel"
                        value={el}
                    />
                ))}
            </div>
        </div>
    );
};

export default CustomPartCutoutBlock;