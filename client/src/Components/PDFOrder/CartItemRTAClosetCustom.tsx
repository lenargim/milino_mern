import React, {FC} from 'react';
import {View, Text} from "@react-pdf/renderer";
import {s} from './PDFOrder'
import {RTAClosetAPIType} from "../CustomPart/CustomPart";


const CartItemRTAClosetCustom: FC<{ rta_closet: RTAClosetAPIType[] }> = ({rta_closet}) => {
        return (
            <View style={s.blocks}>
                <View>
                    {rta_closet.length ?
                        <View>
                            <Text style={s.itemOptionBold}>RTA Closet additional parts:</Text>
                            {rta_closet.map((el, index) => {
                                if (!el.name) return null;
                                return (
                                    <View key={index} style={s.itemOption}>
                                        <Text>{el.name}</Text>
                                        <Text>Width: {el.width}. Amount: {el.qty}</Text>
                                    </View>)
                            })
                            }
                        </View> : null
                    }
                </View>
            </View>
        );
    }
;

export default CartItemRTAClosetCustom