import React, { FC, useEffect } from "react";
import s from "../Product/product.module.sass";
import { useFormikContext } from "formik";
import {
    CustomPartAttrCheckbox,
    ProductInputCustom
} from "../../common/Form";
import { CustomPartFormType } from "./CustomPart";
import {useFormikDefault} from "../../helpers/helpers";

const CustomPartCutoutBlock: FC = () => {
    const { values } = useFormikContext<CustomPartFormType>();
    const cutout = values.panel_accessories.cutout;
    useFormikDefault(cutout.width, "panel_accessories.cutout.width_string", 3);
    useFormikDefault(cutout.height, "panel_accessories.cutout.height_string", 3);

    return (
        <div className={s.blockWithGaps}>
            <CustomPartAttrCheckbox
                className={s.butonFlexLeft}
                label="Add Cutout"
                name="panel_accessories.cutout.has_cutout"
            />

            {cutout.has_cutout && (
                <>
                    <div className={s.titleAndCustomInputBlock}>
                        <label htmlFor="panel_accessories.cutout.width_string">
                            Width
                        </label>
                        <ProductInputCustom
                            name="panel_accessories.cutout.width_string"
                            label="Example 3"
                        />
                    </div>

                    <div className={s.titleAndCustomInputBlock}>
                        <label htmlFor="panel_accessories.cutout.height_string">
                            Height
                        </label>
                        <ProductInputCustom
                            name="panel_accessories.cutout.height_string"
                            label="Example 3"
                        />
                    </div>
                </>
            )}
        </div>
    );
};

export default CustomPartCutoutBlock;