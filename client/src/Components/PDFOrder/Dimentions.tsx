import React, {FC} from "react";
import {Text} from "@react-pdf/renderer";
import {s} from "./PDFOrder";

const Dimensions: FC<{dimensions:string, isStandard?: boolean }> = ({dimensions, isStandard}) => {
    const styling = isStandard ? s.itemOptionCustom : s.itemOption;
    return (
        <>
            {dimensions ?
                <Text style={styling}>
                    <Text>Dimensions:</Text>
                    <Text>{dimensions}</Text>
                </Text> : null
            }
        </>
    )
}


export default Dimensions