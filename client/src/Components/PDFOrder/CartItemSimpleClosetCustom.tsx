import React, {FC} from 'react';
import {View, Text} from "@react-pdf/renderer";
import {s} from './PDFOrder'
import {SimpleClosetAPIType} from "../CustomPart/CustomPart";


const CartItemSimpleClosetCustom: FC<{ simple_closet: SimpleClosetAPIType[] }> = ({simple_closet}) => {
        return (
            <View style={s.blocks}>
                <View>
                    {simple_closet.length ?
                        <View>
                            <Text style={s.itemOptionBold}>Simple Closet additional parts:</Text>
                            {simple_closet.map((el, index) => {
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

export default CartItemSimpleClosetCustom