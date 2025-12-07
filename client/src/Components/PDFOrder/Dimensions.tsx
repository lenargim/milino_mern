import React, {FC} from "react";
import {Text} from "@react-pdf/renderer";
import {s} from "./PDFOrder";
import {CartItemFrontType, IsStandardDimentionsType} from "../../helpers/cartTypes";
import {getFraction} from "../../helpers/helpers";

const Dimensions: FC<{ item:CartItemFrontType }> = ({item}) => {
    const {width, height, depth, isStandard: {dimensions: isStandard}, subcategory} = item;
    if (!width && !height && !depth) return null;
    if (['pvc', 'drawer-inserts'].includes(subcategory)) return null;
    const anyNotStandard = Object.values(isStandard).some(value => !value);
    const widthPart = width ? `${getFraction(width)}"W x` : '';
    const heightPart = height ? ` ${getFraction(height)}"H` : '';
    const depthPart = depth && depth > 1 ? ` x ${getFraction(depth)}"D` : '';
    return (
        <Text>
            <Text style={anyNotStandard ? s.red : s.itemOption}>Dimensions:</Text>
            <Text>
                <Text style={!isStandard.width ? s.itemOptionCustom : s.itemOption}>{widthPart}</Text>
                <Text style={!isStandard.height ? s.itemOptionCustom : s.itemOption}>{heightPart}</Text>
                <Text style={!isStandard.depth ? s.itemOptionCustom : s.itemOption}>{depthPart}</Text>
            </Text>
        </Text>
    )
}


export default Dimensions