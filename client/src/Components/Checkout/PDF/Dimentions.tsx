import React, {FC} from "react";
import {getFraction} from "../../../helpers/helpers";
import {Text, View} from "@react-pdf/renderer";
import {s} from "../PDF";

const Dimentions: FC<{ width: number | undefined, depth: number | undefined, height: number | undefined,isStandard?: boolean }> = ({
                                                                                                                  width,
                                                                                                                  depth,
                                                                                                                  height, isStandard
                                                                                                              }) => {
    const widthPart = width ? `${getFraction(width)}"W x` : '';
    const heightPart = height ? `${getFraction(height)}"H` : '';
    const depthPart = depth && depth > 1 ? `x ${getFraction(depth)}"D` : '';
    const dimentions = `${widthPart} ${heightPart} ${depthPart}`
    return (
        <View>
            {widthPart || heightPart || depthPart ?
                <View style={!isStandard ? s.itemOptionCustom:s.itemOption}>
                    <Text>{dimentions}</Text>
                </View> : null
            }
        </View>
    )
}


export default Dimentions