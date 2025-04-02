import React, {FC} from "react";
import {Text, View} from "@react-pdf/renderer";
import {s} from "../PDF";

const Dimentions: FC<{dimentions:string, isStandard?: boolean }> = ({dimentions, isStandard}) => {
    const styling = isStandard ? s.itemOptionCustom : s.itemOption;
    return (
        <>
            {dimentions ?
                <Text style={styling}>
                    <Text>Dimensions:</Text>
                    <Text>{dimentions}</Text>
                </Text> : null
            }
        </>
    )
}


export default Dimentions