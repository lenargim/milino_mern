import React, { FC, useEffect } from "react";
import s from "../Product/product.module.sass";
import { useFormikContext } from "formik";
import {
    CustomPartAttrCheckbox,
    ProductInputCustom,
    ProductRadioInput
} from "../../common/Form";
import { CustomPartFormType } from "./CustomPart";
import {useFormikDefault} from "../../helpers/helpers";

const CustomPartHingeHoles: FC = () => {
    const arrTypes = ["Hinges", "Holes Only"];
    const { values } = useFormikContext<CustomPartFormType>();
    const hh = values.panel_accessories.hinges_or_holes;
    useFormikDefault(hh.hh_type, "panel_accessories.hinges_or_holes.hh_type", "Hinges");
    useFormikDefault(hh.hh_top, "panel_accessories.hinges_or_holes.hh_top_string", 4);
    useFormikDefault(hh.hh_bottom, "panel_accessories.hinges_or_holes.hh_bottom_string", 4);

    return (
        <div className={s.blockWithGaps}>
            <CustomPartAttrCheckbox
                className={s.butonFlexLeft}
                label="Add Hinges or Hinge holes"
                name="panel_accessories.hinges_or_holes.has_hh"
            />

            {hh.has_hh && (
                <>
                    <div className={s.options}>
                        {arrTypes.map((el, index) => (
                            <ProductRadioInput
                                key={index}
                                name="panel_accessories.hinges_or_holes.hh_type"
                                value={el}
                            />
                        ))}
                    </div>

                    <div className={s.titleAndCustomInputBlock}>
                        <label htmlFor="panel_accessories.hinges_or_holes.hh_top_string">
                            From top
                        </label>
                        <ProductInputCustom
                            name="panel_accessories.hinges_or_holes.hh_top_string"
                            label="Example 4"
                        />
                    </div>

                    <div className={s.titleAndCustomInputBlock}>
                        <label htmlFor="panel_accessories.hinges_or_holes.hh_bottom_string">
                            From bottom
                        </label>
                        <ProductInputCustom
                            name="panel_accessories.hinges_or_holes.hh_bottom_string"
                            label="Example 4"
                        />
                    </div>
                </>
            )}
        </div>
    );
};

export default CustomPartHingeHoles;