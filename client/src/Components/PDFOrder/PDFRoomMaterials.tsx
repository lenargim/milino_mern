import React, {FC} from 'react';
import {Text, View} from "@react-pdf/renderer";
import {MaterialStringsType} from "../../common/Materials";

const PdfRoomMaterials:FC<{materialStrings:MaterialStringsType}> = ({materialStrings}) => {
    const {doorString, boxString, drawerString, leatherString, rod, categoryString} = materialStrings
    return (
        <View>
            <Text>Category: {categoryString}</Text>
            {doorString ? <Text>Door: {doorString}</Text> : null}
            {boxString ? <Text>Box Material: {boxString}</Text> : null}
            {drawerString ? <Text>Drawer: {drawerString}</Text> : null}
            {leatherString ? <Text>Leather: {leatherString}</Text> : null}
            {rod ? <Text>Hanging Rod: {rod}</Text> : null}
        </View>
    );
};

export default PdfRoomMaterials;