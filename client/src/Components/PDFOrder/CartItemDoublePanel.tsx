import {FC} from "react";
import {View, Text} from "@react-pdf/renderer";
import {s} from './PDFOrder'
import {CustomPartDoublePanel, getValueByKey} from "../../helpers/Enums";


const CartItemDoublePanel: FC<{ double_panel: number }> = ({double_panel}) => {
    const val = getValueByKey(CustomPartDoublePanel, double_panel)
    if (!val) return null;
    return (
        <View style={s.blocks}>
            <View style={s.itemOption}>
                <Text>Panel Type:</Text>
                <Text>{val}</Text>
            </View>
        </View>
    );
};

export default CartItemDoublePanel;